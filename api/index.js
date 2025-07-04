import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import testimonialRoutes from './routes/testimonialRoute.js';
import connectDB from './config/db.js';
import connectCloudinary from './config/Cloudinary.js';
import feedbackRoutes from './routes/FeedbackRoutes.js';
import userRouter from './routes/userRoutes.js';
import router from './routes/EmployeeRoutes.js';
import blogRouter from './routes/BlogRoutes.js';

import newsletterRoute from './routes/newsletterRoute.js';
// App Config
const app = express();
const port = process.env.PORT || 4000;

// Database and Cloudinary Connection
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.use('/api/user', userRouter)
app.use('/api/profile', router )

app.use('/api/feedback', feedbackRoutes);
// Routes
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/blog', blogRouter);
app.use('/api/newsletter', newsletterRoute);

// Sample Route
app.get("/", (req, res) => {
    res.send("Welcome to the eEmploee Profile API!");
  });

// Server Listener
app.listen(port, () => console.log(`Server started on PORT: ${port}`));
