import dotenv from "dotenv";
dotenv.config();

import express from "express";
import s3Routes from "./routes/s3Routes";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

console.log("Starting server...");

app.use("/api/v1/s3", s3Routes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("listening on port", port);
});
