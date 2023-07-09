const mongoose = require('mongoose')


const CommentSchema = new mongoose.Schema({
    author: {
      /* The author of comment */
  
      type: String,
      required: [true, "Please provide a title for your song."],
      maxlength: [60, "Name cannot be more than 60 characters"],
    },
    body: {
      /* body of comment */
      type: String,
      required: [true, "comment must have text"],
      maxlength:[10000]
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  });

  module.exports = mongoose.model("Comment", CommentSchema);
