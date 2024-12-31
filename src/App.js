import React, { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";
import CourseForm from "./CourseForm";
import CourseList from "./CourseList";
import "./App.css"

function App() {
  const [currentView, setCurrentView] = useState("registration"); // Default to "registration"

  const renderView = () => {
    switch (currentView) {
      case "registration":
        return <RegistrationForm />;
      case "login":
        return <LoginForm />;
      case "courseForm":
        return <CourseForm />;
      case "courseList":
        return <CourseList />;
      default:
        return <RegistrationForm />;
    }
  };

  return (
    <div className="App">
      <button onClick={() => setCurrentView("registration")}>Registration Form</button>
      <button onClick={() => setCurrentView("login")}>Login Form</button>
      <button onClick={() => setCurrentView("courseForm")}>Add Course</button>
      <button onClick={() => setCurrentView("courseList")}>View Courses</button>
      
      {renderView()}
    </div>
  );
}

export default App;
