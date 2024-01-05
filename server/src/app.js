import express from "express";
import morgan from "morgan";
import cors from "cors";
import v1Routes from "./routes/v1/index.js";
import { converter, notFound } from "./middlewares/error.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import useragent from "express-useragent";
import path from "path";
dotenv.config();

const app = express();
const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../client/dist");

app.use(express.static(buildPath));

const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
  credentials: true, // allow cookies to be sent
};

app.use(cookieParser());

app.use(cors(corsOptions));

// req logger
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(express.json());

// Middleware to parse user agent information
app.use(useragent.express());

// API endpoints
app.use("/api/v1", v1Routes);

// Error handler
app.use(notFound);
app.use(converter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

export default app;
