import express from "express";
import 'dotenv/config';
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import authRoutes from "./src/routes/auth.routes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);

// DB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT , () =>
      console.log(`Server running on port ${process.env.PORT }`)
    );
  })
  .catch((err) => console.error(err));
