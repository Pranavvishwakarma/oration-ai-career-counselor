import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      isGuest: boolean
    } & DefaultSession["user"]
    accessToken?: string
  }

  interface User extends DefaultUser {
    id: string // Make id required
    isGuest?: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string
    isGuest?: boolean
    accessToken?: string
  }
}
