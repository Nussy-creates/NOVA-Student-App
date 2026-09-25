import "./ViewLesson.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ViewLesson = () => {
  const [lessonContent, setLessonContent] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState([]);
  const [quizLoading, setQuizLoading] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const lesson = location.state?.lesson;
  useEffect(() => {
    if (!lesson) return;

    const generateLesson = async () => {
      setLoading(true);

      try {
        const prompt = `
Create a clear and simple lesson for a Nigerian secondary school student.

Subject: ${lesson.subject}
Topic: ${lesson.title}
Class: ${lesson.className}
Duration: ${lesson.duration}

Include:
1. Introduction
2. Main lesson content
3. Important points
4. Summary

Make it easy for a student to understand.
Do not include a quiz.
`;

        const response = await fetch("http://localhost:5000/ask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: prompt,
          }),
        });

        const data = await response.json();

        setLessonContent(data.reply);
      } catch (error) {
        console.error("ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    generateLesson();
  }, [lesson]);
  const startQuiz = async () => {
    setShowQuiz(true);
    setQuizLoading(true);

    try {
      const prompt = `
Create a 5-question multiple-choice quiz for a ${lesson.className} student.

Subject: ${lesson.subject}
Topic: ${lesson.title}

For each question provide:
- The question
- Four options: A, B, C, D
- The correct answer

Make the questions clear and suitable for Nigerian secondary school students.

Return ONLY valid JSON in this format:

[
  {
    "question": "Question here",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  }
]
`;

      const response = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: prompt,
        }),
      });

      const data = await response.json();

      const cleanResponse = data.reply
        .replace("```json", "")
        .replace("```", "")
        .trim();

      const questions = JSON.parse(cleanResponse);

      setQuiz(questions);
    } catch (error) {
      console.error("QUIZ ERROR:", error);
    } finally {
      setQuizLoading(false);
    }
  };

  if (!lesson) {
    return (
      <div className="view-lesson-page">
        <h2>Lesson not found</h2>
        <button onClick={() => navigate("/lessons")}>Back to Lessons</button>
      </div>
    );
  }

  return (
    <div className="view-lesson-page">
      <button className="back-button" onClick={() => navigate("/LessonPlans")}>
        ← Back to Lessons
      </button>

      <div className="lesson-title">
        <span>{lesson.subject}</span>
        <h1>{lesson.title}</h1>
        <p>
          {lesson.className} • {lesson.duration}
        </p>
      </div>

      <section className="lesson-content">
        <h2>Lesson Content</h2>

        {loading ? (
          <p>Generating your lesson...</p>
        ) : (
          <div className="lesson-text">{lessonContent}</div>
        )}
      </section>

      <section className="practice-card">
        <h2>Practice Quiz</h2>

        <p>Test your understanding of this lesson with practice questions.</p>

        {!showQuiz && (
          <button className="practice-button" onClick={startQuiz}>
            Start Practice
          </button>
        )}

        {showQuiz && (
          <div className="quiz-container">
            {quizLoading ? (
              <p>Creating your quiz...</p>
            ) : quizFinished ? (
              <div className="quiz-result">
                <h2>Quiz Complete!</h2>

                <p>
                  You scored {score} out of {quiz.length}
                </p>

                <button
                  className="practice-button"
                  onClick={() => {
                    setCurrentQuestion(0);
                    setScore(0);
                    setSelectedAnswer("");
                    setQuizFinished(false);
                  }}
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                <p className="quiz-progress">
                  Question {currentQuestion + 1} of {quiz.length}
                </p>

                <div className="quiz-question">
                  <h3>{quiz[currentQuestion].question}</h3>

                  <div className="quiz-options">
                    {Object.entries(quiz[currentQuestion].options).map(
                      ([letter, option]) => (
                        <button
                          key={letter}
                          className={
                            selectedAnswer === letter ? "selected-option" : ""
                          }
                          onClick={() => {
                            setSelectedAnswer(letter);
                          }}
                        >
                          <strong>{letter}.</strong> {option}
                        </button>
                      ),
                    )}
                  </div>

                  {selectedAnswer && (
                    <button
                      className="next-question"
                      onClick={() => {
                        const isCorrect =
                          selectedAnswer === quiz[currentQuestion].answer;

                        if (isCorrect) {
                          setScore(score + 1);
                        }

                        if (currentQuestion + 1 < quiz.length) {
                          setCurrentQuestion(currentQuestion + 1);
                          setSelectedAnswer("");
                        } else {
                          setQuizFinished(true);
                        }
                      }}
                    >
                      {currentQuestion + 1 === quiz.length
                        ? "Finish Quiz"
                        : "Next Question"}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </section>

      <section className="ask-card">
        <h2>Ask NOVA</h2>

        <p>Didn't understand something? Ask NOVA about this lesson.</p>

        <button className="practice-button">Ask NOVA</button>
      </section>
    </div>
  );
};

export default ViewLesson;
