import React, { useState } from "react";

const AddProduct = () => {
    const [name,setName]=useState("");
    const [catergory,setCategory]=useState("");
    const [price,setPrice]=useState("");
    const [brand,setBrand]=useState("");

    const AddProductButton= async()=>{
        console.log(name,catergory,price,brand);
        const userID = JSON.parse(localStorage.getItem('user'))._id;
        console.warn(userID);
        const data =  await fetch("http://localhost:5000/addproduct",{
            method:"POST",
            body : JSON.stringify({name,catergory,price,brand,userID}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const result = await data.json();
        console.warn(result);
        if(result){
          alert("Product added successfully!")
        }
    }
  return (
    <div className="addProduct">
      <h1>Add Product</h1>
      <input type="text" placeholder="Product Name" onChange={(e)=>{
        setName(e.target.value);
        console.warn(name)
      }}/>
      <input type="text" placeholder="Catergory" onChange={(e)=>{
        setCategory(e.target.value)
            console.warn(catergory)
      }}/>
      <input type="text" placeholder="Price"onChange={(e)=>{
        setPrice(e.target.value);
        console.warn(price)}}
        />
      <input type="text" placeholder="Brand"  onChange={(e)=>{
        setBrand(e.target.value);
        console.log(brand)
      }}/>
      <button type="submit" onClick={AddProductButton}>Add Product</button>
    </div>
  );
};

export default AddProduct;
