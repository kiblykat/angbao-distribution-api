import connectDB from "./config/db";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import angbaoRouter from "./routes/angbaoRouter";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/angbaos", angbaoRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
