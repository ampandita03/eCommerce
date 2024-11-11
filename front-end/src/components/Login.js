import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/home");
    }
  }, [navigate]);

  const loginButton = async () => {
    const data = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await data.json();
    console.warn(result);
    if (result.name) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/home");
    } else {
      alert("User Not Found!");
    }
  };
  return (
    <div className="loginFields">
      <h1>LOGIN</h1>
      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button type="button" onClick={loginButton}>
        Sign IN
      </button>
    </div>
  );
};

export default LoginComponent;
