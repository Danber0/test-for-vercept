import express from "express";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: "YOUR KEY",
});

app.post("/chat", async (req, res) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: req.body }],
  });

  res.json({ reply: response.choices[0].message.content });
});

app.listen(3001, () =>
  console.log("Proxy server running on http://localhost:3001"),
);
