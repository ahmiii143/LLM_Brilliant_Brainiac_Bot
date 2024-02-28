// aiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export const createGenerativeAI = (apiKey) => {
  return new GoogleGenerativeAI(apiKey);
};

export const generateChatResponse = async (
  genAI,
  modelConfig,
  messageHistory,
  userMessage
) => {
  try {
    const model = genAI.getGenerativeModel(modelConfig);

    const chat = model.startChat({
      history: messageHistory,
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const text = await response.text();

    return text;
  } catch (error) {
    console.error(error.message);
    return "Something was supposed to be secret..... AAYEIN BAIGAN";
  }
};

export default { generateChatResponse, GoogleGenerativeAI, genAI };
