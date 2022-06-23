import express, { Request, Response } from "express";
import morgan from "morgan";
import { myDataSource } from "./configs/app-data-source";
import { environment } from "./configs/environments/environment.staging";

console.clear();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Database connection
myDataSource
	.initialize()
	.then(() => {
		console.log("Data Source has been initialized!");
	})
	.catch((err) => {
		console.error("Error during Data Source initialization:", err);
	});

// Routes
app.get("/", (req: Request, res: Response) => {
	return res.send("Hello World!");
});

// Start server
app.listen(environment.server.PORT, () => {
	console.log(`🚀 Server started on port ${environment.server.PORT} !`);
});
