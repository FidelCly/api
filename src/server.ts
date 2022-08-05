import { AppDataSource } from "./data-source";
import * as dotenv from "dotenv";
import path from "path";
import app from "./app";

AppDataSource.initialize()
  .then(() => {
    // set env
    process.env.NODE_ENV = "development";

    // configure dotenv
    dotenv.config({ path: path.join(__dirname, "../.env") });
    dotenv.config({ path: path.join(__dirname, "../.env.test") });
    dotenv.config({ path: path.join(__dirname, "../.env.dev") });

    // configure port number
    const port = process.env.NODE_DOCKER_PORT || 3000;

    // start express server
    app.listen(port, () => {
      console.log(`Express server has started on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
