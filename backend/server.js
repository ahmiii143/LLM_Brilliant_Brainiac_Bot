// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createGenerativeAI, generateChatResponse } from "./model/aiService.js";
dotenv.config();

const PORT = process.env.PORT;
const genAI = createGenerativeAI(process.env.GOOGLE_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/gemini", async (req, res) => {
  try {
    const modelConfig = { model: "gemini-pro" };
    const { history, message } = req.body;

    const text = await generateChatResponse(
      genAI,
      modelConfig,
      history,
      message
    );

    res.send(text);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
