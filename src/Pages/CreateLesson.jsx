import "./CreateLesson.css";
import { useState } from "react";

const CreateLesson = () => {
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("Biology");
  const [className, setClassName] = useState("SS1");
  const [duration, setDuration] = useState("40 minutes");
  const [loading, setLoading] = useState(false);
  const [generatedLesson, setGeneratedLesson] = useState("");

  const generateLesson = async () => {
    console.log("GENERATE BUTTON CLICKED");
    if (!topic.trim()) return;

    setLoading(true);

    try {
      const prompt = `
Create a simple lesson plan for a ${className} ${subject} class.

Topic: ${topic}
Duration: ${duration}

Include:
1. Learning objectives
2. Introduction
3. Lesson content
4. Student activity
5. Assessment
6. Summary

Make it clear, practical, and suitable for Nigerian secondary school students.
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
      console.log("AI DATA:", data);
      setGeneratedLesson(data.reply);
    } catch (error) {
      console.error("ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-lesson-page">
      <div className="create-lesson-header">
        <h1>Create Lesson</h1>
        <p>Create a lesson plan with NOVA</p>
      </div>

      <div className="lesson-form">
        <div className="form-group">
          <label>Topic</label>
          <input
            type="text"
            placeholder="e.g. Photosynthesis"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        {generatedLesson && (
          <div className="generated-lesson">
            <div className="generated-header">
              <div>
                <span>AI GENERATED LESSON</span>
                <h2>{topic}</h2>
                <p>
                  {subject} • {className} • {duration}
                </p>
              </div>
            </div>

            <div className="generated-content">{generatedLesson}</div>
          </div>
        )}
        <div className="form-group">
          <label>Subject</label>

          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option>Biology</option>
            <option>Chemistry</option>
            <option>Physics</option>
            <option>Mathematics</option>
          </select>
        </div>

        <div className="form-group">
          <label>Class</label>

          <select
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          >
            <option>SS1</option>
            <option>SS2</option>
            <option>SS3</option>
          </select>
        </div>

        <div className="form-group">
          <label>Duration</label>

          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option>30 minutes</option>
            <option>40 minutes</option>
            <option>45 minutes</option>
            <option>60 minutes</option>
          </select>
        </div>

        <button
          className="generate-lesson"
          onClick={generateLesson}
          disabled={loading}
        >
          {loading ? "Generating..." : "✦ Generate with NOVA"}
        </button>
      </div>
    </div>
  );
};

export default CreateLesson;
