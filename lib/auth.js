//import {NextAuthOptions} from "next-auth";
import dbConnect from "./dbConnect";
import clientPromise from "@/lib/mongodb";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";

import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise, {collections: {Accounts: "NextAuthAccounts", Sessions: "NextAuthSessions", Users: "NextAuthUsers", VerificationTokens: "NextAuthVerificationTokens"}}),
  debug: true,
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

      try{

        //console.log('user', user)
        
      await dbConnect();

      if (user) {        
        const dbUser = await User.findOne({ email: user.email }); //maybe change this

        //console.log('THIS DB USER', dbUser)
        

        if (dbUser !== null) {
          //console.log("Found dbUser", dbUser)
          return {
            //...token,
            id: dbUser._id.toString(),
            name: dbUser.name,
            email: dbUser.email,
            image: dbUser.image,
            // Add any other necessary properties from the dbUser to the token
          };
        } else {
          //console.log("Didn't find dbUser, creating...")
          // Create a new user in the database with an empty posts array
          const newUser = new User({
            name: user.name,
            email: user.email,
            image: user.image,
            posts: [], // Initialize an empty posts array
            likes: [], // Initialize an empty posts array
            //add anything else
          });

          //('NEW USER', newUser)

          await newUser.save();

          return {
            //...//token,
            id: newUser._id.toString(),
            name: newUser.name,
            email: newUser.email,
            image: newUser.image,
            // Add any other necessary properties from the newUser to the token
          };
        }
      }
      return token;
    } catch(e){
      console.log('error', e)
    }
    },
    async session({ token, session }) {
      //console.log('TEST', token)
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
      }
      return session;
    },

    // ... other callbacks ...
  },
  //after login
  //   redirect(){
  //       return '/posts'
  //   }
};

export const getAuthSession = () => getServerSession(authOptions);


//auth stuff is being stored inside of accounts db


//adapter is creating the new account




//MAKE note to send something for the adapter? there was an auto thing being made 