import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import projectRoutes from './routes/project.js';
import projectDetails from './routes/projectDetails.js';
import CSDProjectDetails from './routes/CSDProjectDetails.js';
import CSMProjectDetails from './routes/CSMProjectDetails.js';
import teamRoutes from './routes/teams.js';
import cookieParser from 'cookie-parser';
import cseaRoutes from './routes/cseaRoutes.js';
import csmRoutes from './routes/csmRoutes.js';
import csdRoutes from './routes/csdRoutes.js';
import department from './routes/department.js';
import projectSummary from './routes/projectSummary.js';

import cors from 'cors';
import morgan from 'morgan';
//import CSMProjectDetails from './models/CSMProjectDetails.js';

// Load environment variables from .env file
dotenv.config();

const app = express();



/** Middlewares */
app.use(express.json());
const corsConfig = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsConfig));
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = process.env.PORT || 4000; // Use PORT from environment variables

const connect = () => {
    mongoose.set('strictQuery', true);
    console.log('MongoDB URI:', process.env.DB_LOCAL_URI);
    mongoose.connect(process.env.DB_LOCAL_URI)
        .then(() => {
            console.log('MongoDB connected');
        })
        .catch((err) => {
            console.log('Connection error:', err);
            process.exit(1);
        });
};

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/cse", cseaRoutes);
app.use("/api/csm", csmRoutes);
app.use("/api/csd", csdRoutes);
app.use("/api/csea", projectDetails);
app.use("/api/csd", CSDProjectDetails);
app.use("/api/csm", CSMProjectDetails);
app.use("/api/department", department);
app.use("/api/projects", projectSummary);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connect();

});
