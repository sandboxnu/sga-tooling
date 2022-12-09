import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 8080,
  username: "username",
  password: "password",
  database: "db",
  synchronize: true,
  logging: false,
  entities: [],
  migrations: [],
  subscribers: [],
});
