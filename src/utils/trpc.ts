import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server/trpc/router';
// Remove: import { default as superjson } from 'superjson';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // Browser → relative path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // Vercel
  return 'http://localhost:3000'; // Local dev
};

export const trpc = createTRPCReact<AppRouter>();

export const clientConfig = {
  // Remove: transformer: superjson,
  url: `${getBaseUrl()}/api/trpc`,
};
