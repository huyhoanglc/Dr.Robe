import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      enum: ["local", "google", "facebook"],
      default: "local",
    },
    providerId: { type: String }, 

    email: { type: String, required: true, unique: true },
    password: { type: String },   
    isVerified: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserInfo", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Account", accountSchema);
