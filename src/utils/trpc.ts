import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server/trpc/router';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // Browser → relative path
  if (process.env.NEXT_PUBLIC_VERCEL_URL) return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`; // Vercel
  return 'http://localhost:3000'; // Local dev
};

export const trpc = createTRPCReact<AppRouter>();

export const clientConfig = {
  url: `${getBaseUrl()}/api/trpc`,
};
