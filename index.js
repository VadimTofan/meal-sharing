import express from "express";
import { getMeals } from "./db.js";

const app = express();

app.get("/", (request, response) => {
  response.send("Welcome to Meal Sharing");
});

app.get("/all-meals", async (request, response) => {
  const meals = await getMeals("meals");
  response.send(meals);
});

app.get("/future-meals", async (request, response) => {
  const meals = await getMeals("futureMeals");
  response.send(meals);
});

app.get("/past-meals", async (request, response) => {
  const meals = await getMeals("pastMeals");
  response.send(meals);
});

app.get("/first-meal", async (request, response) => {
  const meal = await getMeals("firstMeal");
  if (!meal || (Array.isArray(meal) && meal.length === 0)) return response.send("There are no meals for your request!");
  response.send(meal);
});

app.get("/last-meal", async (request, response) => {
  const meal = await getMeals("lastMeal");
  if (!meal || (Array.isArray(meal) && meal.length === 0)) return response.send("There are no meals for your request!");
  response.send(meal);
});

const port = 8000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
