import type mongoose from "mongoose";
import { type Db } from "mongodb";
import { type User, type Session } from "next-auth";

// MONGOOSE DATA TYPES
export interface Cached {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose> | null;
}

export interface Image {
  url: string;
  filename: string;
  thumbnail?: string; // This is a virtual
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
  comments: mongoose.Types.ObjectId[] | CommentDocument[];
  likeCount: number;
  likes: mongoose.Types.ObjectId[] | string[];
}

interface CommentAttributes {
  body: string;
  author: mongoose.Schema.Types.ObjectId | UserDocument;
}

export type CommentDocument = CommentAttributes & mongoose.Document;

interface UserAttributes {
  email: string;
  username: string;
  image: string;
  posts?: mongoose.Types.ObjectId[] | PostDocument[]; // optional array of post IDs
  likes?: mongoose.Types.ObjectId[]; // optional array of post IDs
}

export interface UserDocument extends mongoose.Document, UserAttributes {}

// AUTH TYPES
interface ExtendedUser extends User {
  id: string;
}

export interface ExtendedSession extends Session {
  user?: ExtendedUser;
}

export type Result<T> = { data: T; error: null } | { data: null; error: Error };

export interface SuccessResponse {
  message: string;
}

export interface ErrorResponse {
  error: string;
  status: number;
}

export type APIResponse = SuccessResponse | ErrorResponse;

export interface PostFormDataType {
  title: string;
  description: string;
  imageFile: string; // or Blob if it's a file object
  dateMade: Date; // or Date if it's a date object
  mouseActions: MouseAction[]; // define a more specific type if possible
}

declare namespace NodeJS {
  interface Global {
    _mongoClientPromise?: Db;
  }
}

declare global {
  namespace NodeJS {
    interface Global {
      _mongoClientPromise: any;
    }
  }
}

export interface UserResult {
  username: string;
  allMouseActions: MouseAction[];
  postNumber: number | undefined;
}
