import express from "express";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(async () => {
    // configure dotenv
    dotenv.config({ path: __dirname + "/.env" });

    // create express app
    const app = express();
    app.use(bodyParser.json());

    // configure port number
    const port = process.env.NODE_DOCKER_PORT || 3000;

    // start express server
    app.listen(port);

    console.log(
      `Express server has started on port ${port}. Open http://localhost:${port}/users to see results`
    );
  })
  .catch((error) => console.log(error));
