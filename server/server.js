const OpenAI = require("openai");
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("NOVA AI backend is running!");
});

app.post("/ask", async (req, res) => {
  console.log("ASK ROUTE REACHED");
  const { message } = req.body;

  try {
    const response = await openai.responses.create({
      model: "openai/gpt-oss-20b",
      input: message,
    });

    res.json({
      reply: response.output_text,
    });
  } catch (error) {
    console.error("OPENAI ERROR:", error);

    res.status(500).json({
      error: error.message,
    });
  }
});
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
