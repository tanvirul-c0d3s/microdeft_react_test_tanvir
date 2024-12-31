import React, { useState } from "react";

function CourseForm() {
  // State for course data
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    badge_text: "",
    badge_color: "",
    instructor_name: "",
  });

  // State for feedback message
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourseData({ ...courseData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload

    const token = localStorage.getItem("authToken"); // Get the token from localStorage
    if (!token) {
      setMessage("Error: You must be logged in to create a course.");
      return;
    }

    try {
      // Send course data to the API
      const response = await fetch("https://react-interview.crd4lc.easypanel.host/api/course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Pass the token in Authorization header
        },
        body: JSON.stringify(courseData), // Convert courseData to JSON
      });

      const result = await response.json(); // Parse the server response

      if (response.ok) {
        setMessage("Course created successfully!");
      } else {
        setMessage(`Error: ${result.message || "Failed to create course"}`);
      }
    } catch (error) {
      console.error("Error during course creation:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Create Course</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={courseData.title}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
          </div>
          <div>
            <label>
              Description:
              <textarea
                name="description"
                value={courseData.description}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
          </div>
          <div>
            <label>
              Badge Text:
              <input
                type="text"
                name="badge_text"
                value={courseData.badge_text}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Badge Color:</label>
            <input
              type="color"
              name="badge_color"
              value={courseData.badge_color}
              onChange={handleChange}
              required
              style={{
                width: "50px",
                height: "40px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                background: "transparent",
              }}
            />
          </div>
          <div>
            <label>
              Instructor Name:
              <input
                type="text"
                name="instructor_name"
                value={courseData.instructor_name}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Create Course
          </button>
        </form>
        {message && (
          <p
            style={{
              marginTop: "10px",
              textAlign: "center",
              color: message.startsWith("Error") ? "red" : "green",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default CourseForm;
