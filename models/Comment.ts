import mongoose from "mongoose";
import { type CommentDocument } from "@/types";

const CommentSchema = new mongoose.Schema<CommentDocument>({
  body: {
    /* body of comment */
    type: String,
    required: [true, "comment must have text"],
    maxlength: [10000, "Max length for comment is 10000 characters"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "MUST HAVE AUTHOR"],
  },
});

const CommentModel: mongoose.Model<CommentDocument> =
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  mongoose.models.Comment ||
  mongoose.model<CommentDocument>("Comment", CommentSchema);

export default CommentModel;

// at some point, need to really think about why im modeling as i am modeling. one to many vs whatever

// title, author, dateMade, description
