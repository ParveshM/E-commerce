import express from "express";
import ENV from "./config/ENV";
import connectDb from "./config/dbconnection";
const app = express();

app.get("/", (req, res) => {
  res.send("server responding");
});

app.listen(ENV.PORT, async () => {
  await connectDb();
  console.log(`server listening on http://localhost:${ENV.PORT}`);
});
