import * as dotenv from "dotenv";
import path from "path";
import app from "./app";
import { TestDataSource } from "./test-data-source";

TestDataSource.initialize()
  .then(() => {
    // configure dotenv
    dotenv.config({ path: path.join(__dirname, "../.env.test") });

    // configure port number
    const port = process.env.PORT || 3000;

    // start express server
    app.listen(port, () => {
      console.log(`Express server has started on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
