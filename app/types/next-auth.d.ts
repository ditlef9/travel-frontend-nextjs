// app/types/next-auth.d.ts

import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    token?: string;
    name?: string;
  }

  interface Session {
    user: {
      token?: string;
      name?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token?: string;
    name?: string;
  }
}
