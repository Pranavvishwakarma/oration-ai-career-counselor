import { initTRPC } from "@trpc/server";
import { chatRouter } from "./chat";

const t = initTRPC.create();

export const appRouter = t.router({
  chat: chatRouter,
});

export type AppRouter = typeof appRouter;
