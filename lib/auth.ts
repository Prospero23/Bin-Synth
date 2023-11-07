import dbConnect from "./dbConnect";
import clientPromise from "@/lib/mongodb";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
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
      // @ts-expect-error FIX ME
      clientId: process.env.GOOGLE_CLIENT_ID,
      // @ts-expect-error FIX ME
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user == null) return token;

      await dbConnect();

      const dbUser = await User.findOne({ email: user.email });

      if (dbUser != null) {
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
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (token) {
        // @ts-expect-error FIX ME

        session.user.id = token.id;
        // @ts-expect-error FIX ME

        session.user.name = token.name;
        // @ts-expect-error FIX ME

        session.user.email = token.email;
        // @ts-expect-error FIX ME

        session.user.image = token.image;
      }
      return session;
    },
  },
};

export const getAuthSession = async () => await getServerSession(authOptions);

// todo: Auth has check built in that i can use to make this more clean
