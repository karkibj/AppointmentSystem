import express, { json, urlencoded } from "express";
import connectMongo from "./config/connection.js";
const app = express();
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors'
import cron from "node-cron"

// Load environment variables
dotenv.config({
    path: "./.env"
});

const PORT = process.env.PORT || 5173;

// CORS Configuration
app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    credentials: true,  // Allow credentials (cookies, authorization headers) //added by dipesh
}));

app.use(express.json({ limit: '5mb' }));  
app.use(express.urlencoded({ extended: false, limit: '5mb' })); 
app.use(cookieParser()); //

// Import routes (only once)
import errorHandler from './middlewares/errorHandler.js';
import authRoutes from './routes/Auth.routes.js';
import appointmentRoutes from './routes/appointment.routes.js';
import doctorRoutes from './routes/Doctor.routes.js';
import userRoutes from './routes/user.route.js';
import { Doctor } from "./models/Doctor.model.js";

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/user', userRoutes);

cron.schedule('0 0 * * 0', async () => {
    try {
        console.log("Running weekly availability reset...");

        // Find slots reserved more than 7 days ago and reset them
        await Doctor.updateMany(
            {
                "availability.timeslot.status": "reserved",
                "availability.timeslot.reservedAt": { $lte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
            }, 
            {
                $set: {
                    "availability.$[].timeslot.$[elem].status": "available",
                    "availability.$[].timeslot.$[elem].reservedAt": null
                }
            },
            {
                arrayFilters: [{ "elem.status": "reserved" }]
            }
        );

        console.log("Doctor availability reset successfully");
    } catch (error) {
        console.error("Error resetting doctor availability:", error);
    }
});
// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB
connectMongo();

// Start the server
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
