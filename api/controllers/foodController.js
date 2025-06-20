import Food from '../models/foodModel.js';

// Create a new food item
export const createFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    const { name, description, price } = req.body;  // Destructure price from the request body

    if (!name || !description || !price) {
      return res.status(400).json({ message: 'Name, description, and price are required' });
    }

    const food = new Food({
      name,
      description,
      price,  // Add the price
      image: req.file.path,  // Store the image path
    });

    const savedFood = await food.save();
    res.status(201).json({ message: 'Food item created', food: savedFood });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all food items
export const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single food item by ID
export const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.status(200).json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a food item
export const updateFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    const { name, description, price } = req.body;  // Include price in the request body

    food.name = name || food.name;
    food.description = description || food.description;
    food.price = price || food.price;  // Update the price if provided

    // If a new image is uploaded, update the image field
    if (req.file) {
      food.image = req.file.path;
    }

    const updatedFood = await food.save();
    res.status(200).json({ message: 'Food item updated', food: updatedFood });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a food item by ID
export const deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.status(200).json({ message: 'Food item deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
