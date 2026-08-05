import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
 message:{
  type:String,
  required:true
 },
 createdAt: {
    type: Date,
    default: Date.now,
  }

});

export default mongoose.model("Message", messageSchema);