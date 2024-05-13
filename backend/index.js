import path from "path";
import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";

const port = process.env.PORT || 3000;
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/genres", genreRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
