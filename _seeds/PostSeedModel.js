const mongoose = require('mongoose')
const Comment  = require("./CommentSeedModel");


const ImageSchema = new mongoose.Schema({
  url: String,
  filename: String,
});


const PostSchema = new mongoose.Schema({
  title: {
    /* The title of the track */

    type: String,
    required: [true, "Please provide a title for your song."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  image: ImageSchema,
  dateMade: {
    /* date of post */

    type: Date,
    required: [true, "Please specify the date you made this."],
  },
  description: {
    /* how would you describe your music? */
    type: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});


PostSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Comment.deleteMany({
      _id: {
        $in: doc.comments,
      },
    });
  }
})

module.exports = mongoose.model("Post", PostSchema);
//at some point, need to really think about why im modeling as i am modeling. one to many vs whatever


//title, author, dateMade, description