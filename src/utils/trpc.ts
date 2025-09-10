import { createTRPCReact } from '@trpc/react-query';
// Fix this import:
import type { AppRouter } from '../server/trpc/index'; // Changed from router to index

export const trpc = createTRPCReact<AppRouter>();