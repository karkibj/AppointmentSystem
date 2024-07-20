import express, { json, urlencoded } from "express";
import connectMongo from "./config/connection.js";
const app = express();
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from './routes/Auth.routes.js';

dotenv.config({
    path: "./.env"
});

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser()); // Correct usage
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRoutes);

connectMongo();

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
