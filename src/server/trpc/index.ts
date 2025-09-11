import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { createContext, type Context } from './context';
import { chatRouter } from './chat';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const appRouter = t.router({
  chat: chatRouter,
});

export type AppRouter = typeof appRouter;
export { createContext };