import mongoose from "mongoose";
import { type UserDocument } from "@/types";

const UserSchema = new mongoose.Schema<UserDocument>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      // required: true,
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      // required: true
    },
  ],
});
const UserModel: mongoose.Model<UserDocument> =
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;

// at some point, need to really think about why im modeling as i am modeling. one to many vs whatever

// title, author, dateMade, description
