import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

function Add({ token }) {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="container my-5 ">
      <div className="mb-4 ">
        <h3 className="mb-3">Upload Image</h3>
        <div className="d-flex gap-3">
          {[1, 2, 3, 4].map((num) => (
            <label
              htmlFor={`image${num}`}
              key={num}
              className="border p-2 rounded d-flex align-items-center justify-content-center"
              style={{ width: "100px", height: "100px" }}
            >
              <img
                src={
                  !eval(`image${num}`)
                    ? assets.upload_area
                    : URL.createObjectURL(eval(`image${num}`))
                }
                alt=""
                className="img-fluid"
                style={{ maxHeight: "100%" }}
              />
              <input
                onChange={(e) => eval(`setImage${num}`)(e.target.files[0])}
                type="file"
                id={`image${num}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Product Name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="form-control"
          placeholder="Type here"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Product Description</label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="form-control"
          placeholder="Type content"
          rows="4"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Product Category</label>
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="form-select"
        >
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Sub Category</label>
        <select
          onChange={(e) => setSubCategory(e.target.value)}
          className="form-select"
        >
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Winterwear">Winterwear</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Product Price</label>
        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          type="number"
          className="form-control"
          placeholder="25"
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Product Sizes</label>
        <div className="d-flex gap-2">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <button
              key={size}
              type="button"
              className={`btn ${
                sizes.includes(size) ? "btn-primary" : "btn-outline-secondary"
              }`}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="form-check mb-4">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          type="checkbox"
          className="form-check-input"
          id="bestseller"
          checked={bestseller}
        />
        <label htmlFor="bestseller" className="form-check-label">
          Add to Bestseller
        </label>
      </div>

      <button type="submit" className="btn btn-success w-100">
        Add Product
      </button>
    </form>
  );
}

export default Add;
