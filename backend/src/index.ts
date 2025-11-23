import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import cors from "cors";
import dotenv from "dotenv"

dotenv.config()

const app = express();

app.use(cors({
  origin: "http://localhost:3001",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

const port = "3000";

app.all("/api/auth/{*splat}", toNodeHandler(auth));

app.use(express.json());

app.listen(port, () => {
  console.log(`---------Server listening on port ${port}-------------`);
});