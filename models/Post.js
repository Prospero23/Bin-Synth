import mongoose from "mongoose";
import Comment from "@/models/Comment";

const ImageSchema = new mongoose.Schema({
  url: String,
  filename: String,
});

const MouseActionSchema = new mongoose.Schema({
  event: String,
  x: Number,
  y: Number,
  prevX: Number,
  prevY: Number,
  time: Number,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const PostSchema = new mongoose.Schema({
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

PostSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Comment.deleteMany({
      _id: {
        $in: doc.comments,
      },
    });
  }
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);

//title, author, dateMade, description

//add likes and the LIKE
