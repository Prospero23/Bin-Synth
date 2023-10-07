import mongoose from "mongoose";
import Comment from "@/models/Comment";
import { type Image, type MouseAction, type PostDocument } from "@/lib/types";

const ImageSchema = new mongoose.Schema<Image>({
  url: String,
  filename: String,
});

const MouseActionSchema = new mongoose.Schema<MouseAction>({
  event: String,
  x: Number,
  y: Number,
  prevX: Number,
  prevY: Number,
  time: Number,
});

ImageSchema.virtual("thumbnail").get(function (this: Image) {
  return this.url.replace("/upload", "/upload/w_200");
});

const PostSchema = new mongoose.Schema<PostDocument>({
  title: {
    /* The title of the track */

    type: String,
    required: [true, "Please provide a title for your song."],
    maxlength: [40, "Name cannot be more than 40 characters"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  image: ImageSchema,
  mouseActions:[MouseActionSchema],
  dateMade: {
    /* date of post */

    type: Date,
    required: [true, "Please specify the date you made this."],
  },
  description: {
    /* how would you describe your music? */
    type: String,
    required: [true, "Please provide a description for your song."],
    maxlength: [400, "Max description is 400 characters"]

  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likeCount: {
    type: Number,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

PostSchema.post<PostDocument>("findOneAndDelete", async function (doc: PostDocument | null) {
  if (doc) {
    await Comment.deleteMany({
      _id: {
        $in: doc.comments,
      },
    });
  }
});

const PostModel: mongoose.Model<PostDocument> = mongoose.models.Post || mongoose.model<PostDocument>("Post", PostSchema);


export default PostModel;

//title, author, dateMade, description

//add likes and the LIKE
