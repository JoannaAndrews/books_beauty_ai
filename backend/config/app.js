// config/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import bookRoutes from "../routes/book.route.js"; // include .js

// import aiRoutes from "../routes/ai.route.js";     // if used

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/books", bookRoutes);

// app.use("/api/openai", aiRoutes);

export default app;
