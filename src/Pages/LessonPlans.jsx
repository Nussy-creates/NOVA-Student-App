import "./LessonPlans.css";
import { useNavigate } from "react-router-dom";

const lessons = [
  {
    subject: "Biology",
    title: "Photosynthesis",
    className: "SS2",
    duration: "40 minutes",
  },
  {
    subject: "Biology",
    title: "Digestive System",
    className: "SS2",
    duration: "40 minutes",
  },
  {
    subject: "Biology",
    title: "Metamorphosis",
    className: "SS1",
    duration: "35 minutes",
  },
];

const LessonPlans = () => {
  const navigate = useNavigate();
  return (
    <div className="lesson-page">
      <div className="lesson-header">
        <div>
          <h1>Lesson Plans</h1>
          <p>Create and manage your lessons</p>
        </div>
        <button
          className="create-lesson"
          onClick={() => navigate("/create-lesson")}
        >
          + Create Lesson
        </button>
      </div>

      <section className="lesson-section">
        <h2>My Lessons</h2>

        <div className="lesson-grid">
          {lessons.map((lesson, index) => (
            <div className="lesson-card" key={index}>
              <span className="lesson-subject">{lesson.subject}</span>
              <h3>{lesson.title}</h3>
              <div className="lesson-info">
                <span>{lesson.className}</span>
                <span>{lesson.duration}</span>
              </div>
              \
              <button
                className="view-lesson"
                onClick={() => navigate("/view-lesson", { state: { lesson } })}
              >
                View Lesson
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LessonPlans;
