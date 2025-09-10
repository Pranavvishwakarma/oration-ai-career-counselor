import prisma from '../prisma';
import { auth } from '../../auth';

export async function createContext() {
  const session = await auth();
  
  return {
    prisma,
    user: session?.user || null,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
