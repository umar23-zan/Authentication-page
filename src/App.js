import React, { useState } from "react";
import axios from "axios";
import './App.css'


const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? "http://localhost:5000/login" : "http://localhost:5000/signup";
    try {
      const response = await axios.post(url, { email, password });
      if (isLogin) {
        alert("Logged in successfully");
      } else {
        alert(response.data.message); // Display signup message
      }
      setMessage(response.data.message);
    }  catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post("http://localhost:5000/forgot-password", { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error sending reset link.");
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1>ShariaStock</h1>
      </div>
      <div className="form-container">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="loginbtn" type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        <p>{message}</p>
        {isLogin && (
          <>
            <p>
              <button className="fgbtn" onClick={handleForgotPassword}>Forgot Password?</button>
            </p>
            <p>
              Don't have an account? <button className="signupbtn" onClick={() => setIsLogin(false)}>Sign Up</button>
            </p>
            </>
        )}
        {!isLogin && (
          <p>
            Already have an account? <button className="nested-loginbtn" onClick={() => setIsLogin(true)}>Login</button>
          </p>
        )}
      </div>
      
    </div>
  );
};

export default App;
