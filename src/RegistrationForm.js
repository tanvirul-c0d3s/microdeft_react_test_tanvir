import React, { useState } from "react";

function RegistrationForm() {
  // State to store form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // State for feedback
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page refresh

    try {
      // Send the data to the API
      const response = await fetch("https://react-interview.crd4lc.easypanel.host/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Data format
        },
        body: JSON.stringify(formData), // Form data converted to JSON
      });

      const result = await response.json(); // Parse server response

      // Check if the request was successful
      if (response.ok) {
        setMessage("Registration successful!"); // Success feedback
      } else {
        setMessage(`Error: ${result.message || "Something went wrong"}`); // Error feedback
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error: Could not register. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
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
              value={formData.password}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            />
          </label>
        </div>
        <button type="submit" style={{ padding: "10px 20px", background: "#4CAF50", color: "#fff", border: "none", borderRadius: "4px" }}>
          Register
        </button>
      </form>
      {message && <p style={{ marginTop: "10px", color: message.startsWith("Error") ? "red" : "green" }}>{message}</p>}
    </div>
  );
}

export default RegistrationForm;
