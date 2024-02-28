import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import geminiRoutes from "./routes/routes.js";
dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

app.use("/", geminiRoutes);

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
