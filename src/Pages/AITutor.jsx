import "./AITutor.css";
import { useState } from "react";
import { FaRobot, FaPaperPlane } from "react-icons/fa";

const AITutor = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setInput("");

    try {
      console.log("Sending message to backend:", userMessage);
      const response = await fetch("https://nova-ai-backend.onrender.com/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, something went wrong.",
        },
      ]);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="ai-tutor">
      <div className="chat-area">
        {messages.length === 0 ? (
          <div className="welcome">
            <div className="welcome-icon">
              <FaRobot />
            </div>

            <h2>Hello, Nussaibah 👋</h2>

            <p>I'm your AI Tutor. What would you like to learn today?</p>

            <div className="suggestions">
              <button
                onClick={() =>
                  setInput("Explain a topic to me in simple terms")
                }
              >
                Explain a topic
              </button>

              <button onClick={() => setInput("Help me solve this question")}>
                Help me solve a question
              </button>

              <button
                onClick={() => setInput("Quiz me on what I have learned")}
              >
                Quiz me
              </button>

              <button onClick={() => setInput("Summarize my notes")}>
                Summarize my notes
              </button>
            </div>
          </div>
        ) : (
          <div className="messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.sender === "user" ? "user-message" : "ai-message"
                }`}
              >
                {message.sender === "ai" && (
                  <div className="message-icon">
                    <FaRobot />
                  </div>
                )}

                <p>{message.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Ask your AI Tutor anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button onClick={sendMessage}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default AITutor;
