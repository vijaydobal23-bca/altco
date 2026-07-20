import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    images:{
      type:String,
      required:[true, "Image is required"]
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    category: {
        type: String,
        enum:["protein","oats","drinks"],
        required: [true, "Category is required"],
    },
    qty:{
      type:String,
      required:true
    }
  
})
const productModel = mongoose.model("Product", productSchema);
export default productModel;