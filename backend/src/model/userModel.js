import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Never return password in queries by default
    },

    role: {
      type: String,
      enum: ["buyer", "seller"],
      default: "buyer",
    },

    // Top-level verification for both buyer and seller
    isVerified: {
      type: Boolean,
      default: false,
    },

    // Seller-specific fields (only populated when role === "seller")
    sellerInfo: {
      storeName: {
        type: String,
        trim: true,
      }
    } 
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

const User = mongoose.model("User", userSchema);

export default User;
