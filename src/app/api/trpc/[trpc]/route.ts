import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter, createContext } from '@/server/trpc/index';

const handler = async (req: Request) => {
  try {
    return await fetchRequestHandler({
      endpoint: '/api/trpc',
      req,
      router: appRouter,
      createContext: () => createContext(),
      onError: ({ error, path }) => {
        console.error(`TRPC Error on ${path}:`, error);
      },
    });
  } catch (error) {
    console.error('TRPC Handler Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

export { handler as GET, handler as POST };
