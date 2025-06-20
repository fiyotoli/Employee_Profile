import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import connectCloudinary from './config/Cloudinary.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/EmployeeRoutes.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

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
app.use('/api/product', productRouter )
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

// Sample Route
app.get("/", (req, res) => {
    res.send("Welcome to the E-Commerce API!");
  });

// Server Listener
app.listen(port, () => console.log(`Server started on PORT: ${port}`));
