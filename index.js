import express from "express";
import { getMeals } from "./db.js";

const port = 8000;
const app = express();

const mealNotFound = (meal, response) => {
  const emptyData = "There are no meals for your request!";
  if (meal === null) {
    return response.json(emptyData);
  }
  response.json(meal);
};

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
  const meal = await getMeals("WHERE `id` = 1");
  mealNotFound(meal, response);
});

app.get("/last-meal", async (request, response) => {
  const meal = await getMeals("WHERE `id` = (SELECT MAX(`id`) FROM meal)");
  mealNotFound(meal, response);
});

app.listen(port, () => {
  console.log("server ready", port);
});
