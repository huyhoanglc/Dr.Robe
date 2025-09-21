import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    species: String, 
    breed: String,    
    age: Number,
    medicalHistory: [String], 
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "UserInfo" },
  },
  { timestamps: true }
);

export default mongoose.model("Pet", petSchema);
