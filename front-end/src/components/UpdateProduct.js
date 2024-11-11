import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateComponent = () => {
  const [updatedName, setUpdatedName] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [updatedBrand, setUpdatedBrand] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    try {
      let response = await fetch(`http://localhost:5000/product/${params.id}`);
      let result = await response.json();
      setUpdatedName(result.name);
      setUpdatedCategory(result.category);
      setUpdatedPrice(result.price);
      setUpdatedBrand(result.brand);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const updateButton = async () => {
    console.warn(updatedName, updatedCategory, updatedPrice, updatedBrand);
    try {
      let response = await fetch(`http://localhost:5000/product/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: updatedName,
          category: updatedCategory,
          price: updatedPrice,
          brand: updatedBrand,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let result = await response.json();
      console.warn(result);
      if (response.ok) {
        navigate("/product");
      } else {
        alert("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="UpdateProducts">
      <h1>Update Component</h1>
      <input
        type="text"
        placeholder="Product Name"
        value={updatedName}
        onChange={(e) => setUpdatedName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={updatedCategory}
        onChange={(e) => setUpdatedCategory(e.target.value)}
      />
      <input
        type="text"
        placeholder="Price"
        value={updatedPrice}
        onChange={(e) => setUpdatedPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Brand"
        value={updatedBrand}
        onChange={(e) => setUpdatedBrand(e.target.value)}
      />
      <button type="submit" onClick={updateButton}>Update Details</button>
    </div>
  );
};

export default UpdateComponent;
