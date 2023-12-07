import "dotenv/config.js";
import express from "express";
import "express-async-errors";
import cookieParser from "cookie-parser";
import cors from "cors";
import pino from "pino-http";
import mongoose from "mongoose";
// routes
import authRoutes from "./Routes/authRoutes.js";
import petsRoutes from "./Routes/petsRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
//middlewares
import pageNotFound from "./Middlewares/notFoundPage.js";
import handleError from "./Middlewares/errorHandler.js";

const app = express();
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://petz-bpm5-api.onrender.com"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});
app.use(
  cors({
    origin: [
  "http://localhost:3000",
  "https://petz-bpm5.onrender.com"
],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to the Home Page of Adoptify!");
});

app.use("/", authRoutes);
app.use("/", petsRoutes);
app.use("/", userRoutes);

app.use(pageNotFound);
app.use(handleError);

// const __dirname = dirname(fileURLToPath(import.meta.url));
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }
// app.use(express.static(path.resolve(__dirname, './client/dist')));

const PORT = 8080 || process.env.PORT;

async function start() {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log(`DB up and running!!`);
    app.listen(PORT, () => {
      console.log(`running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
