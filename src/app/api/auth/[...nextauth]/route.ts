
import { signInEmailPassword } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? '',
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? '',
            clientSecret: process.env.GOOGLE_SECRET ?? '',
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = await signInEmailPassword(credentials?.email ?? '', credentials?.password ?? '');

                if (user) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],

    callbacks: {

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email; // Asegurar que email está presente
            }

            return token;
        },
        async session({ session, token }) {
            if (token && session && session.user) {
                session.user.id = token.id;
                session.user.email = token.email; // Asegurar que email está presente
            }

            return session;
        },
    },
    session: {
        strategy: 'jwt'
    }

}


const handler = NextAuth(authOptions)


export { handler as GET, handler as POST };
