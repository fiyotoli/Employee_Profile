import express from 'express';
import multer from 'multer';
import path from 'path';
import { createFood, getAllFoods, getFoodById, updateFood, deleteFood } from '../controllers/foodController.js'; // Import controller functions

const router = express.Router();

// Set up multer disk storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/food-images');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter for image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);

  if (extname && mimeType) {
    cb(null, true);
  } else {
    cb(new Error('Error: Only image files are allowed!'), false);
  }
};

// Set up multer middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Routes for food items
router.post('/', upload.single('image'), createFood); // Route to create a new food item
router.get('/', getAllFoods); // Route to get all food items
router.get('/:id', getFoodById); // Route to get a single food item by ID
router.put('/:id', upload.single('image'), updateFood); // Route to update a food item
router.delete('/:id', deleteFood); // Route to delete a food item by ID

export default router;
