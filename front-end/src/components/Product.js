import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
const Product = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    let data = await fetch("http://localhost:5000/product");
    data = await data.json();
    setProducts(data);
  };
  console.warn(products);

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "delete",
    });
    result = await result.json();

    if (result) {
      getProducts();
      alert("Product deleted successfully!")
    }
  };

  const handleSearch= async (e)=>{
    const key = e.target.value;
    let result = await fetch(`http://localhost:5000/search/${key}`);
    result = await result.json();
    if(result){
      setProducts(result)
    }
    else{
      getProducts();
    }
  }
  return (
    <div className="productList">
      <h1>Product List</h1>
      <input type="text" placeholder="Search for Products" onChange={handleSearch}/>
      <ul>
        <li>SNO</li>
        <li>Name</li>
        <li>Brand</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>

      {
       products.length>0 ?( products.map((item, index) => (
        <div className="productMapList">
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.brand}</li>
            <li>₹{item.price}</li>
            <li>{item.category}</li>
            <li>
              <button
                type="button"
                onClick={() => {
                  deleteProduct(item._id);
                }}
              >
                Delete Product
              </button>
              <Link to = {"/updateproduct/"+item._id}>Edit</Link>
            </li>
          </ul>
          
        </div>
      ))
    ): <h1>Product Not Found</h1>
  } 
    </div>
  );
};

export default Product;
