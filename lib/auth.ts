import dbConnect from "./dbConnect";
import clientPromise from "@/lib/mongodb";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { type AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise, {
    collections: {
      Accounts: "NextAuthAccounts",
      Sessions: "NextAuthSessions",
      Users: "NextAuthUsers",
      VerificationTokens: "NextAuthVerificationTokens",
    },
  }),
  debug: false,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/users/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (!user) return token;

      await dbConnect();

      const dbUser = await User.findOne({ email: user.email });

      if (dbUser) {
        return {
          id: dbUser._id.toString(),
          name: dbUser.name,
          email: dbUser.email,
          image: dbUser.image,
        };
      }

      const newUser = new User({
        name: user.name,
        email: user.email,
        image: user.image,
        posts: [],
        likes: [],
      });

      await newUser.save();

      return {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        image: newUser.image,
      };
    },

    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
      }
      return session;
    },
  },
};

export const getAuthSession = async () => await getServerSession(authOptions);
