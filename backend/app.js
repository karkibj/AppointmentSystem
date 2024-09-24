import express, { json, urlencoded } from "express";
import connectMongo from "./config/connection.js";
const app = express();
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import cors from 'cors'

app.use(cors({
    origin:"http://localhost:3000",
    methods:['GET','POST','PATCH','DELETE','PUT']
}))


import errorHandler from './middlewares/errorHandler.js';
import authRoutes from './routes/Auth.routes.js';
import appointmentRoutes from './routes/appointment.routes.js' 
import doctorRoutes from './routes/Doctor.routes.js';
import userRoutes from './routes/user.route.js'
dotenv.config({
    path: "./.env"
});

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser()); // Correct usage
app.use(express.urlencoded({ extended: false }));



app.use('/api/auth', authRoutes);
app.use('/api/doctor',doctorRoutes);
app.use('/api/appointment',appointmentRoutes)
app.use('/api/user',userRoutes)
app.use(errorHandler);



connectMongo();
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
