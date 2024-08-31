import express from "express";
import ENV from "./config/ENV";
import connectDb from "./config/dbconnection";
import morgan from "morgan";
import cors from "cors";
import CustomError from "./utils/customError";
import { HttpStatus } from "./types/HttpStatus";
import errorHandlingMidleware from "./middlewares/errorHandler";
import userRouter from "./routes/user.routes";
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", userRouter);

app.all("*", (req, res, next) =>
  next(new CustomError(`Not found: ${req.url}`, HttpStatus.NOT_FOUND))
);
app.use(errorHandlingMidleware);

app.listen(ENV.PORT, async () => {
  await connectDb();
  console.log(`server listening on http://localhost:${ENV.PORT}`);
});
