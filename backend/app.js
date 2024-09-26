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

dotenv.config({
    path: "./.env"
});

const PORT = process.env.PORT || 5173;

// CORS Configuration
app.use(cors({
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT']
}));

// Increase body size limits for JSON and URL-encoded data
app.use(express.json({ limit: '5mb' }));  // Set JSON body limit to 5MB
app.use(express.urlencoded({ extended: false, limit: '5mb' }));  // Set URL-encoded body limit to 5MB
app.use(cookieParser()); // Correct usage

// Import routes
import errorHandler from './middlewares/errorHandler.js';
import authRoutes from './routes/Auth.routes.js';
import appointmentRoutes from './routes/appointment.routes.js';
import doctorRoutes from './routes/Doctor.routes.js';
import userRoutes from './routes/user.route.js';

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/user', userRoutes);

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB
connectMongo();

// Start the server
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
