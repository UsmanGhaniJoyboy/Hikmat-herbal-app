import React, { useState } from "react";
import CustomeNav from "../inc/CustomeNav";
import Custome_heading from "../inc/Custome_heading";
import "../StyleSheets/Add_Product.css";
import { useNavigate } from "react-router-dom";

const Add_product = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [usage, setUsage] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle changes in product name input
  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  // Function to handle changes in usage radio buttons
  const handleUsageChange = (e) => {
    setUsage(e.target.value);
  };

  // Function to handle changes in min price input
  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  // Function to handle changes in max price input
  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  // Function to handle file selection
  const handleFileSelect = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleAddProduct = () => {
    alert("Product added successfully!");
    navigate("/HakeemProfile");
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to server
    console.log("Form submitted:", {
      productName,
      usage,
      minPrice,
      maxPrice,
      selectedImage,
    });
  };

  return (
    <div>
      <CustomeNav />
      <Custome_heading title="Add Product" />
      <form onSubmit={handleSubmit} className="Add_product_container">
        <div>
          <label htmlFor="productName" className="form-label">
            Product Name :
          </label>
          <input
            type="text"
            id="productName"
            placeholder="Product Name"
            value={productName}
            onChange={handleProductNameChange}
            className="form-input"
          />
        </div>
        <label className="form-label form-radio-label">Usage for:</label>
        <div className="form-radio-container">
          <label>
            <input
              type="radio"
              value="Male"
              checked={usage === "Male"}
              onChange={handleUsageChange}
              className="form-radio-input"
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              value="Female"
              checked={usage === "Female"}
              onChange={handleUsageChange}
              className="form-radio-input"
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              value="Both"
              checked={usage === "Both"}
              onChange={handleUsageChange}
              className="form-radio-input"
            />
            Both
          </label>
        </div>
        <div>
          <label htmlFor="minPrice" className="form-label">
            Min Price:
          </label>
          <input
            type="text"
            id="minPrice"
            placeholder="Min Price"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="maxPrice" className="form-label">
            Max Price:
          </label>
          <input
            type="text"
            id="maxPrice"
            placeholder="Max Price"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="image" className="form-label">
            Select Image:
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileSelect}
            className="form-input"
          />
        </div>
        <button
          onClick={handleAddProduct}
          type="submit"
          className="form-button"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add_product;
