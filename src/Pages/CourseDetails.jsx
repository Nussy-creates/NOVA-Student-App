import "./CourseDetails.css";
import { useParams } from "react-router-dom";
import courses from "../Data/Courses";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CourseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedLesson, setSelectedLesson] = useState(null);

  const course = courses.find((course) => course.id === Number(id));

  return (
    <div className="course-details">
      <h1>{course.title}</h1>
      <p>{course.category}</p>
      <p>{course.description}</p>
      <h2>Lessons</h2>
      {selectedLesson && (
        <div className="video-section">
          <h2>{selectedLesson.title}</h2>

          <iframe
            width="100%"
            height="450"
            src={`https://www.youtube.com/embed/${selectedLesson.youtubeId}`}
            title={selectedLesson.title}
            allowFullScreen
          ></iframe>
        </div>
      )}

      <div className="lessons">
        {course.lessons.map((lesson) => (
          <div className="lesson" key={lesson.id}>
            <h3>{lesson.title}</h3>
            <button onClick={() => setSelectedLesson(lesson)}>
              Watch Lesson
            </button>
          </div>
        ))}
        <button className="arrow" onClick={() => navigate("/MyCourses")}>
          Back
          <FaArrowLeft />{" "}
        </button>
      </div>
    </div>
  );
};

export default CourseDetails;
