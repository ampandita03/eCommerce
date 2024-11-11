import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div className="nav">
      <img src="https://th.bing.com/th/id/OIP.CZZQzscnv1_gF-WEh52bgAAAAA?w=400&h=400&rs=1&pid=ImgDetMain"/>
      {auth ? (
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/product">Product</Link>
          </li>
          <li>
            <Link to="/updateproduct">Update Product</Link>
          </li>
          <li>
            <Link to="/addproduct"> Add Product</Link>
          </li>
          <li>
            <Link to="/signup" onClick={logout}>
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <>
              <Link to="/login" className="LoginNav">Login</Link>
              <Link to="/signup" className="SignUpNav">SignUp</Link>
            </>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
