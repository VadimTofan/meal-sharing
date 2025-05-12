import dotenv from "dotenv";
import knex from "knex";

dotenv.config();

const dbClient = knex({
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
  },
});

export async function getMeals(condition = "") {
  const result = await dbClient.raw(`SELECT * FROM meal ${condition}`);
  const meals = result[0];
  return meals;
}
