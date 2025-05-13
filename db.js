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
  const now = new Date().toISOString();
  if (condition === "meals") return await dbClient.select("*").from("meal");
  if (condition === "pastMeals") return await dbClient.select("*").from("meal").where("when", "<", now);
  if (condition === "futureMeals") return await dbClient.select("*").from("meal").where("when", ">", now);
  if (condition === "firstMeal") return await dbClient.select("*").from("meal").orderBy("id").first();
  if (condition === "lastMeal") return await dbClient.select("*").from("meal").orderBy("id", "desc").first();
}
