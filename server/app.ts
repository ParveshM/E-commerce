import express from "express";
import ENV from "./config/ENV";
import connectDb from "./config/dbconnection";
import morgan from "morgan";
import cors from "cors";
import CustomError from "./utils/customError";
import { HttpStatus } from "./types/HttpStatus";
import errorHandlingMidleware from "./middlewares/errorHandler";
import userRouter from "./routes/user.routes";
import adminRouter from "./routes/admin.routes";
import productsRouter from "./routes/product.routes";
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
app.use("/api/admin", adminRouter);
app.use("/api/products", productsRouter);

app.all("*", (req, res, next) =>
  next(new CustomError(`Not found: ${req.url}`, HttpStatus.NOT_FOUND))
);
app.use(errorHandlingMidleware);

app.listen(ENV.PORT, async () => {
  await connectDb();
  console.log(`server listening on http://localhost:${ENV.PORT}`);
});
