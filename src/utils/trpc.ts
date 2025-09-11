import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@/server/trpc/router';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser → relative
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // vercel
  if (process.env.NODE_ENV === 'production') return 'https://oration-ai-career-counselor.vercel.app'; // production fallback
  return 'http://localhost:3000'; // local
};

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
      // Remove: transformer: superjson,
    }),
  ],
});