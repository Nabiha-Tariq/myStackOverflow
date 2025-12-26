import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface IloginUserModel {
  email: string;
  password: string;
}

const Login = () => {
  const [data, setData] = useState<IloginUserModel>({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const value = event.target.value;
    setData({ ...data, [id]: value }); 
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!data.email) {
      alert("Please enter your email");
      return;
    }
    if (!data.password) {
      alert("Please enter your password");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Login failed");
        return;
      }

      if (result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("activeUser", JSON.stringify({ email: data.email }));
      }

      setData({ email: "", password: "" });
      navigate("/");

    } catch (error) {
      console.error(error);
      alert("Server not responding");
    }
  };

  return (
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Login Here</h3>

        <label>Email</label>
        <input
          type="text"
          placeholder="Email"
          id="email"
          value={data.email}
          onChange={handleInputChange}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={data.password}
          onChange={handleInputChange}
        />

        <button type="submit">Log In</button>
        <div className="social">
          <Link to="/register">Register</Link>
        </div>
        <div className="Forgetpswd">
          <Link to="/forget">Forget Password</Link>
        </div>
      </form>
    </>
  );
};

export default Login;
