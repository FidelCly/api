import { DataSource } from "typeorm";
import { environment } from "../configs/environments/environment.dev";

export const myDataSource = new DataSource({
	type: "mysql",
	host: "localhost",
	// port: 3306,
	username: environment.database.username,
	password: environment.database.password,
	database: environment.database.database,
	entities: ["src/entity/*.js"],
	logging: true,
	synchronize: true
});
