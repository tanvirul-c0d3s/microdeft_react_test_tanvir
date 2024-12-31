import React, { useState } from "react";

function LoginForm() {
  // State for storing form inputs
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // State for feedback message
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload
  
    try {
      // Send login data to the API
      const response = await fetch("https://react-interview.crd4lc.easypanel.host/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(loginData), // Convert loginData to JSON
      });
  
      const result = await response.json(); // Parse the server response
  
      if (response.ok) {
        // Save the token to localStorage
        localStorage.setItem("authToken", result.data.token); // Save the token dynamically from the response
        setMessage("Login successful!");
      } else {
        setMessage(`Error: ${result.message || "Invalid credentials"}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };
  
  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            />
          </label>
        </div>
        <button type="submit" style={{ padding: "10px 20px", background: "#4CAF50", color: "#fff", border: "none", borderRadius: "4px" }}>
          Login
        </button>
      </form>
      {message && <p style={{ marginTop: "10px", color: message.startsWith("Error") ? "red" : "green" }}>{message}</p>}
    </div>
  );
}

export default LoginForm;
