import mongoose from "mongoose";

const userInfoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: String,
    dob: Date,
    address: String,
    age: Number,
    avatar: String,

    role: {
      type: String,
      enum: ["customer", "vet", "staff", "admin"],
      default: "customer",
    },
    
    specialization: String, 
    shift: String, 

    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],

    boarding: [
      {
        pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
        startDate: Date,
        endDate: Date,
        notes: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("UserInfo", userInfoSchema);
