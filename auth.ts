// import NextAuth from "next-auth";
// import GitHubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import { AUTHOR_BY_GITHUB_ID } from "@/sanity/lib/queries";
// import { client } from "@/sanity/lib/client";
// import { writeClient } from "@/sanity/lib/w-client";
// import { JWT } from "next-auth/jwt";
// import { User, Account, Profile } from "next-auth";
// import { DefaultSession } from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     id: string;
//     user: {
//       id: string;
//     } & DefaultSession["user"];
//   }
// }

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_CLIENT_ID!,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET!,
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   callbacks: {
//     async signIn({
//       user,
//       profile,
//     }: {
//       user: User;
//       profile?: Profile;
//     }) {
//       if (!profile?.id) {
//         console.error("GitHub profile is missing an ID.");
//         return false;
//       }

//       try {
//         // Check if the user already exists in Sanity
//         const existingUser = await client.fetch(AUTHOR_BY_GITHUB_ID, {
//           id: profile.id,
//         });

//         if (!existingUser) {
//           // Create the user only if they do not already exist
//           await writeClient.create({
//             _type: "author",
//             id: profile.id,
//             name: user.name || "",
//             username: profile.login,
//             email: user.email || "",
//             image: user.image || "",
//             bio: (profile as any).bio || "",
//           });
//         }

//         return true; // Allow sign-in
//       } catch (error) {
//         console.error("Error during sign-in callback:", error);
//         return false; // Prevent sign-in on error
//       }
//     },
//     async jwt({
//       token,
//       account,
//       profile,
//     }: {
//       token: JWT;
//       account: Account | null;
//       profile?: Profile;
//     }) {
//       if (account && profile) {
//         try {
//           const user = await client.fetch(AUTHOR_BY_GITHUB_ID, {
//             id: profile.id,
//           });

//           if (user) {
//             token.id = user._id;
//           } else {
//             console.error("No matching user found for this GitHub profile.");
//           }
//         } catch (error) {
//           console.error("Error fetching user during JWT callback:", error);
//         }
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       Object.assign(session.user, { id: token.id });
//       return session;
//     },
//   },
// });
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { AUTHOR_BY_PROVIDER_ID } from "@/sanity/lib/queries";
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
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: { user: User; account: Account | null; profile?: Profile }) {
      if (!profile || !account) {
        console.error("Missing profile or account data.");
        return false;
      }

      try {
        const providerId = account.providerAccountId;
        const providerType = account.provider;

        // Check if the user already exists in Sanity
        const existingUser = await client.fetch(AUTHOR_BY_PROVIDER_ID, {
          id: providerId,
          provider: providerType,
        });

        if (!existingUser) {
          // Create the user only if they do not already exist
          await writeClient.create({
            _type: "author",
            id: providerId,
            provider: providerType,
            name: user.name || "",
            username: (profile as any).login || profile.email?.split("@")[0] || "",
            email: user.email || "",
            image: user.image || "",
            bio: (profile as any).bio || "",
          });
        }

        return true; // Allow sign-in
      } catch (error) {
        console.error("Error during sign-in callback:", error);
        return false; // Prevent sign-in on error
      }
    },

    async jwt({ token, account, profile }: { token: JWT; account: Account | null; profile?: Profile }) {
      if (account && profile) {
        try {
          const providerId = account.providerAccountId;
          const providerType = account.provider;

          const user = await client.fetch(AUTHOR_BY_PROVIDER_ID, {
            id: providerId,
            provider: providerType,
          });

          if (user) {
            token.id = user._id;
          } else {
            console.error("No matching user found for this provider.");
          }
        } catch (error) {
          console.error("Error fetching user during JWT callback:", error);
        }
      }
      return token;
    },

    async session({ session, token }) {
      Object.assign(session.user, { id: token.id });
      return session;
    },
  },
});
