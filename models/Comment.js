import mongoose from 'mongoose';



const CommentSchema = new mongoose.Schema({

    body: {
      /* body of comment */
      type: String,
      required: [true, "comment must have text"],
      maxlength:[10000],
      required: [true, "Must keave a COMMENT."],

    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "MUST HAVE AUTHOR"]
    }
  });
  
  export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
  
  //at some point, need to really think about why im modeling as i am modeling. one to many vs whatever
  
  
  //title, author, dateMade, description
  