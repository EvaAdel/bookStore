import mongoose from "mongoose";
const { Schema ,model } = mongoose;
const authorSchema = new Schema({
   name: {
      type: String,
      required: true} ,
    bio: String,
    birthDate: Date,
    books: [{type:mongoose.Types.ObjectId,ref:"book"}],
    },{timestamps : true}); 

export default mongoose.models.author ||model ("author", authorSchema) 