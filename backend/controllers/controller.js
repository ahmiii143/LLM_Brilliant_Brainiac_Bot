import { GoogleGenerativeAI } from "@google/generative-ai";

export const geminiController = async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY); // Create genAI here
    const modelConfig = { model: "gemini-pro" };
    const { history, message } = req.body;

    // Validate request
    if (!history || !message) {
      return res.status(400).json({ message: "failed" });
    }

    // Get generative model
    const model = genAI.getGenerativeModel(modelConfig);
    const chat = model.startChat({ history });

    // Send message and generate response
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = await response.text();

    // Send response
    res.send(text);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Err" });
  }
};

export default { geminiController };
