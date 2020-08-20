import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { profileRouter } from "./routers/profile-router";
import cors from "cors";
const app = express();
//our application from express
app.use(bodyParser.json());
app.use(cors());
app.use("/profiles", profileRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.statusCode) {
    console.log(err);
    res.status(err.statusCode).send(err.message);
  } else {
    //if it wasn't one of our custom errors, send generic response
    console.log(err);
    res.status(500).send("Oops, something went wrong");
  }
});

//what port do we want?
app.listen(2007, () => {
  //start server on port 2007
  console.log("Server has started");
});
