import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/home");
    }
  }, [navigate]);

  const dataCollected = async () => {
    console.warn(name, email, password);
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    localStorage.setItem("user", JSON.stringify(result));
    console.warn(result);
    alert("Sign Up successfull! Please Login")

  };

  return (
    <div className="inputContainer">
      <h1>Enter Your Details</h1>
      <input
        className="inputBox"
        type="text"
        value={name}
        placeholder="Enter your name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="inputBox"
        type="email"
        value={email}
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="inputBox"
        type="password"
        value={password}
        placeholder="Enter your password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="signUp" type="button" onClick={dataCollected}>
        SignUp
      </button>
    </div>
  );
};

export default SignUp;
