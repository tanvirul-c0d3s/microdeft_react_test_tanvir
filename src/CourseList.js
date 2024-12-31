import React, { useState, useEffect } from "react";
import './CourseList.css'
function CourseList() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  // Fetch the courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
        try {
          const response = await fetch('https://react-interview.crd4lc.easypanel.host/api/course', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
            },
          });
      
          const result = await response.json();
          console.log(result);  // Log the entire response for debugging
      
          // Access the courses from result.data.data
          if (Array.isArray(result.data.data)) {
            setCourses(result.data.data);  // Set the courses if it's an array
          } else {
            setError("No courses found or data is in an incorrect format.");
          }
        } catch (err) {
          setError("Failed to fetch courses. Please try again.");
        }
      };
      

    fetchCourses();
  }, []); // Run only once after component mounts

  return (
    <div className="course-list">
      {error && <p>{error}</p>}
      {Array.isArray(courses) && courses.length > 0 ? (
        courses.map((course) => (
          <div key={course.id} className="course-card">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>{course.badge_text}</p>
            <p>{course.badge_color}</p>
            <p>{course.instructor_name}</p>

          </div>
        ))
      ) : (
        <p style={{color: "white"}}>No courses available.</p>
      )}
    </div>
  );
}

export default CourseList;
