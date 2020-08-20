import { Pool } from "pg";

import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

export const connectionPool: Pool = new Pool({
  host: process.env["PG_HOST"], // public ip of db instance
  user: process.env["PG_USER"],
  password: process.env["PG_PASSWORD"],
  database: process.env["PG_DATABASE"],
  port: 5432, // standard db port
  max: 5, // max # connections
});
