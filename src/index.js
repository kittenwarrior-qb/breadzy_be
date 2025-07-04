import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDb } from "./configs/db.js";
import productRoute from "./routes/product.route.js";
import categoryRoute from "./routes/category.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/products", productRoute);
app.use("/api/categories", categoryRoute);

const port = process.env.PORT || 5050;

await connectDb();

app.listen(port, () => {
  console.log(`Server đang chạy trên cổng ${port}`);
});
