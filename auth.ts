import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { AUTHOR_BY_GITHUB_ID } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/w-client";
import { JWT } from "next-auth/jwt";
import { User, Account, Profile } from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    id: string;
    user: {
      id: string;
    } & DefaultSession["user"]
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ 
      user,  
      profile 
    }: { 
      user: User,  
      profile?: Profile 
    }) {
      if (!profile?.id) {
  console.error("GitHub profile is missing an ID.");
        return false;
      }

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID, {
          id: profile.id,
        });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: profile.id,
          name: user.name || "",
          username: profile.login,
          email: user.email || "",
          image: user.image || "",
          bio: (profile as any).bio || "",
        });
      }

      return true;
    },
    async jwt({ token, account, profile }: { 
      token: JWT, 
      account: Account | null, 
      profile?: Profile 
    }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID, {
            id: profile.id,
          });

        token.id = user?._id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.id = token.id as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});