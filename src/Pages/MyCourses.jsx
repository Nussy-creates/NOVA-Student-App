import "./MyCourses.css";
import courses from "../Data/Courses";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const navigate = useNavigate();
  return (
    <div className="courses-page">
      <h1>My Courses</h1>

      <p className="page">Continue your learning journey.</p>

      <div className="course-grid">
        {courses.map((course) => (
          <div className="course-card" key={course.id}>
            <h2>{course.title}</h2>

            <p>{course.category}</p>

            <p>{course.description}</p>

            <p>{course.progress}% complete</p>

            <button onClick={() => navigate(`/courses/${course.id}`)}>
              View Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
