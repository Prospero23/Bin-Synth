//import {NextAuthOptions} from "next-auth";
import dbConnect from "./dbConnect";
import clientPromise from "@/lib/mongodb";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";

import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
      strategy: 'jwt'
  },
  pages: {
      signIn: '/users/login'
  },
  providers: [
      GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
  ],
  callbacks: {
      async session({token, session}){
          //console.log('TEST', token)
          if(token){
              session.user.id = token.id;
              session.user.name = token.name;
              session.user.email = token.email;
              session.user.image = token.image;
              //session.user.username = token.username;
          }
          return session;
      },
      //get from user from db
      async jwt({token, user}){
          await dbConnect()
          const dbUser = await User.findOne({email: token.email});
          //console.log( 'DBUSER ', dbUser)
          //console.log('JWT Callback - Token:', token);
          //console.log('user', user)
  
          if (!dbUser){
              token.id = user.id;
              return token
          }
  
          if(!dbUser.username){
              //do something here
          }
          return {
              id: dbUser._id.toString(),
              name: dbUser.name,
              email: dbUser.email,
              image: dbUser.image,
          }
      },
      //after login
    //   redirect(){
    //       return '/posts'
    //   }
  }
  
};

export const getAuthSession = () => getServerSession(authOptions);
