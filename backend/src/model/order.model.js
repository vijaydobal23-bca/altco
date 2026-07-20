import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({

  seller:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  items:[
    {
      product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"
      },
      quantity:{
        type:Number,
        required:true
      },
      status:{
        type:String,
        enum:["PENDING","SHIPPED","DELIVERED","CANCELLED"],
        default:"PENDING"
      }
    }
  ],

  status:{
    type:String,
    enum:["PENDING","SHIPPED","DELIVERED","CANCELLED"],
    default:"PENDING"
  },
  paymentMethod:{
    type:String,
    enum:["COD","UPI"]
  },
  totalAmount:{
    type:Number,
    required:true
  },

  destinationAddress:{
    type:String,
    required:true
  },
  phone:{
    type:String,
    required:true
  },

  paymentStatus:{
    type:String,
    enum:["PENDING","PAID","FAILED"],
    default:"PENDING",
    required:true
  }
});

const orderModel = mongoose.model("Order",orderSchema);
export default orderModel;