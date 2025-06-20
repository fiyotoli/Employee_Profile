import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });

  // Fetch food details
  const fetchFoodDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/foods/${id}`);
      setFormData({
        name: response.data.name,
        description: response.data.description,
        price: response.data.price,
      });
    } catch (error) {
      console.error('Error fetching food details:', error);
    }
  };

  // Update food
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('price', formData.price);
      if (formData.image) data.append('image', formData.image);

      await axios.put(`http://localhost:4000/api/foods/${id}`, data);
      alert('Food item updated successfully!');
      navigate('/list'); // Navigate to the list page
    } catch (error) {
      console.error('Error updating food item:', error);
      alert('Failed to update food item.');
    }
  };

  useEffect(() => {
    fetchFoodDetails();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Edit Food Item</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
          />
        </div>
        <button type="submit" className="btn btn-success">Update</button>
      </form>
    </div>
  );
};

export default Edit;
