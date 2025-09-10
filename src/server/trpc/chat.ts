import { initTRPC } from "@trpc/server";
import { z } from "zod";
import prisma from "../prisma";
import { getCareerAdvice } from "../../utils/ai";
import { createContext, type Context } from "./context";

const t = initTRPC.context<Context>().create();

// Chat Router
export const chatRouter = t.router({
  // Create or get user
  createUser: t.procedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const user = await prisma.user.create({
        data: {
          name: input.name,
        },
      });
      return user;
    }),

  // Fetch all chat sessions with messages for current user
  getChats: t.procedure.query(async ({ ctx }) => {
    // Check if user is authenticated
    if (!ctx.user?.id) {
      return [];
    }
    
    return prisma.chat.findMany({
      where: { userId: ctx.user.id }, // ✅ Current user के chats
      include: { messages: true },
      orderBy: { createdAt: "desc" },
    });
  }),

  // Create a new chat session
  addSession: t.procedure
    .input(z.object({ topic: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // Check if user is authenticated
      if (!ctx.user?.id) {
        throw new Error('User not authenticated');
      }
  
      // Guest user के लिए database में entry create करें
      if (ctx.user.isGuest) {
        // Check if guest user already exists
        const existingUser = await prisma.user.findUnique({
          where: { id: ctx.user.id }
        });
  
        // If guest user doesn't exist, create it
        if (!existingUser) {
          await prisma.user.create({
            data: {
              id: ctx.user.id,
              name: ctx.user.name || 'Guest User',
              email: ctx.user.email,
              isGuest: true,
            },
          });
        }
      }
  
      const chat = await prisma.chat.create({
        data: {
          topic: input.topic,
          userId: ctx.user.id, // ✅ Current user के लिए chat
        },
      });
      return chat;
    }),

  // Add a message to a session
  addMessage: t.procedure
    .input(
      z.object({
        chatId: z.number(),
        sender: z.enum(["User", "AI"]),
        content: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Verify chat belongs to current user
      if (ctx.user?.id) {
        const chat = await prisma.chat.findFirst({
          where: {
            id: input.chatId,
            userId: ctx.user.id
          }
        });
        
        if (!chat) {
          throw new Error('Chat not found or access denied');
        }
      }

      // Save user/AI message
      const message = await prisma.message.create({
        data: {
          chatId: input.chatId,
          sender: input.sender,
          content: input.content,
        },
      });

      // If the message is from user, generate AI response
      if (input.sender === "User") {
        // Get chat history for context
        const chatHistory = await prisma.message.findMany({
          where: { chatId: input.chatId },
          orderBy: { createdAt: "asc" },
        });
        
        // Generate AI response using the util function
        const aiResponse = await getCareerAdvice(
          input.content,
          chatHistory.map((msg: { sender: string; content: string }) => ({
            role: msg.sender.toLowerCase(),
            content: msg.content
          }))
        );

        // Save AI response
        await prisma.message.create({
          data: {
            chatId: input.chatId,
            sender: "AI",
            content: aiResponse,
          },
        });
      }

      return message;
    }),

  // Get messages for a specific chat
  getMessages: t.procedure
    .input(z.object({ chatId: z.number() }))
    .query(async ({ input, ctx }) => {
      // Verify chat belongs to current user
      if (ctx.user?.id) {
        const chat = await prisma.chat.findFirst({
          where: {
            id: input.chatId,
            userId: ctx.user.id
          }
        });
        
        if (!chat) {
          throw new Error('Chat not found or access denied');
        }
      }

      return prisma.message.findMany({
        where: { chatId: input.chatId },
        orderBy: { createdAt: "asc" },
      });
    }),
});

 