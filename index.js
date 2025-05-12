import express from "express";
import { getMeals } from "./db.js";

const port = 8000;
const app = express();

const error404 = "There are no meals for your request!";
const mealError = (meals, response) => {
  if (!meals.length) {
    return response.status(404).json({ message: error404 });
  }
  response.json(meals);
};

app.get("/", (request, response) => {
  response.send("Welcome to Meal Sharing");
});

app.get("/all-meals", async (request, response) => {
  const meals = await getMeals();
  mealError(meals, response);
});

app.get("/future-meals", async (request, response) => {
  const meals = await getMeals("WHERE `when` > NOW()");
  mealError(meals, response);
});

app.get("/past-meals", async (request, response) => {
  const meals = await getMeals("WHERE `when` < NOW()");
  mealError(meals, response);
});

app.get("/first-meal", async (request, response) => {
  const meals = await getMeals("WHERE `id` = 1");
  mealError(meals, response);
});

app.get("/last-meal", async (request, response) => {
  const meals = await getMeals("WHERE `id` = (SELECT MAX(`id`) FROM meal)");
  mealError(meals, response);
});

app.listen(port, () => {
  console.log("server ready", port);
});
