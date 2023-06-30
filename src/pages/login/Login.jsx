import React, { useState } from "react";
import "./Login.scss";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { email, password });
      if(res.data.success) {
        localStorage.setItem("currentUser", JSON.stringify(res.data.data))
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <Layout>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <h2>Sign in</h2>
          <label htmlFor="">Email</label>
          <input
            type="text"
            name="email"
            placeholder="your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            placeholder="your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
