import { initTRPC } from "@trpc/server";
import { chatRouter } from "./chat";
import { createContext, type Context } from "./context";

const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  chat: chatRouter,
});

export type AppRouter = typeof appRouter;
export { createContext };
