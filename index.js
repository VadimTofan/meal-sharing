import express from "express";
import { getMeals } from "./db.js";

const port = 8000;
const app = express();

app.get("/", (request, response) => {
  response.send("Welcome to Meal Sharing");
});

app.get("/all-meals", async (request, response) => {
  const meals = await getMeals();
  response.send(meals);
});

app.get("/future-meals", async (request, response) => {
  const meals = await getMeals("WHERE `when` > NOW()");
  response.send(meals);
});

app.get("/past-meals", async (request, response) => {
  const meals = await getMeals("WHERE `when` < NOW()");
  response.send(meals);
});

app.get("/first-meal", async (request, response) => {
  const meal = await getMeals("WHERE `id` = (SELECT MIN(`id`) FROM meal)");
  if (!meal || (Array.isArray(meal) && meal.length === 0)) return response.send("There are no meals for your request!");
  response.send(meal);
});

app.get("/last-meal", async (request, response) => {
  const meal = await getMeals("WHERE `id` = (SELECT MAX(`id`) FROM meal)");
  if (!meal || (Array.isArray(meal) && meal.length === 0)) return response.send("There are no meals for your request!");
  response.send(meal);
});

app.listen(port, () => {
  console.log("server ready", port);
});
