import express from "express";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import path from "path";

AppDataSource.initialize()
  .then(async () => {
    // configure dotenv
    dotenv.config({ path: path.join(__dirname, "/.env") });

    // create express app
    const app = express();

    // call middlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    // configure logger
    app.use(morgan("[:date[iso]] Started :method :url for :remote-addr"));
    app.use(morgan("[:date[iso]] Completed :status in :response-time ms"));

    // configure port number
    const port = process.env.NODE_DOCKER_PORT || 3000;

    // use router
    app.use("/", routes);

    // start express server
    app.listen(port);

    console.log(`Express server has started on http://localhost:${port}`);
  })
  .catch((error) => console.log(error));
