import dbConnect from "./dbConnect";
import clientPromise from "@/lib/mongodb";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { type AuthOptions, type User as NextUser } from "next-auth";

interface CustomUser extends NextUser {
  id: string;
}

declare module "next-auth" {
  interface Session {
    user?: CustomUser;
  }
}

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise, {
    collections: {
      Accounts: "NextAuthAccounts",
      Sessions: "NextAuthSessions",
      Users: "NextAuthUsers",
      VerificationTokens: "NextAuthVerificationTokens",
    },
  }),
  debug: true,
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
      // console.log(dbUser);
      if (dbUser != null) {
        return {
          id: dbUser._id.toString(),
          name: dbUser.username,
          email: dbUser.email,
          image: dbUser.image,
        };
      }

      const newUser = new User({
        username: user.name,
        email: user.email,
        image: user.image,
        posts: [],
        likes: [],
      });

      await newUser.save();

      return {
        id: newUser._id.toString(),
        name: newUser.username,
        email: newUser.email,
        image: newUser.image,
      };
    },

    async session({ session, token }) {
      // Initialize session.user with default values for CustomUser properties
      if (session.user == null) {
        session.user = {
          id: "", // Default value for 'id'
          name: "", // Default value for 'name'
          email: "", // Default value for 'email'
          image: "", // Default value for 'image'
          // Add default values for any other required properties of CustomUser
        } satisfies CustomUser;
      }

      // Type assertion is no longer necessary here since we've already initialized session.user as CustomUser
      if (token != null) {
        if (typeof token.id === "string") {
          session.user.id = token.id;
        }
        if (typeof token.name === "string") {
          session.user.name = token.name;
        }
        if (typeof token.email === "string") {
          session.user.email = token.email;
        }
        if (typeof token.image === "string") {
          session.user.image = token.image;
        }
      }

      return session;
    },
    // signIn: async ({ user, account, profile }) => {
    //   console.log("Sign In Error:", user, account, profile);
    //   return true; // Or handle errors
    // },
    // redirect: async ({ url, baseUrl }) => {
    //   console.log("Redirect Error:", url, baseUrl);
    //   return baseUrl;
    // },
  },
};
export const getAuthSession = async () => await getServerSession(authOptions);

// todo: Auth has check built in that i can use to make this more clean
