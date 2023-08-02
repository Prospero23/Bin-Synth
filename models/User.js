import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
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
      //required: true,
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      //required: true
    },
  ],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);

//at some point, need to really think about why im modeling as i am modeling. one to many vs whatever

//title, author, dateMade, description
