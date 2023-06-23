import mongoose from 'mongoose';



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
  });
  
  export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
  
  //at some point, need to really think about why im modeling as i am modeling. one to many vs whatever
  
  
  //title, author, dateMade, description
  