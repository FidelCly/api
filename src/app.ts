import express from "express";
import * as bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes";

// create express app
const app = express();

// call middlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// configure logger
app.use(morgan("[:date[iso]] Started :method :url for :remote-addr"));
app.use(morgan("[:date[iso]] Completed :status in :response-time ms"));

// use router
app.use("/", routes);

export default app;
