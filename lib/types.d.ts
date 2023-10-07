import mongoose from "mongoose";
import { User, Session } from "next-auth";


// MONGOOSE DATA TYPES
export interface Cached {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose> | null;
}


export interface Image {
  url: string;
  filename: string;
  thumbnail?: string;  // This is a virtual
}

export interface MouseAction {
  event: string;
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  time: number;
}


export interface PostDocument extends mongoose.Document {
  title: string;
  author: mongoose.Types.ObjectId | UserDocument;
  image: Image;
  mouseActions: MouseAction[];
  dateMade: Date;
  description: string;
  comments: mongoose.Types.ObjectId[] | Comment[];
  likeCount: number;
  likes: mongoose.Types.ObjectId[] | string[];
}

interface CommentAttributes {
  body: string;
  author: mongoose.Schema.Types.ObjectId;
}

export type CommentDocument = CommentAttributes & mongoose.Document;


interface UserAttributes {
  email: string;
  name: string;
  image: string;
  posts?: mongoose.Types.ObjectId[];  // optional array of post IDs
  likes?: mongoose.Types.ObjectId[];  // optional array of post IDs
}

export interface UserDocument extends mongoose.Document, UserAttributes { }



// AUTH TYPES
interface ExtendedUser extends User {
  id: string;
}

export interface ExtendedSession extends Session {
  user?: ExtendedUser;
}




