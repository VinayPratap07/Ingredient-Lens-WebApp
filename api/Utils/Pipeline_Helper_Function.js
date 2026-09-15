//This file consists of the common funciton needed by our pipeline like the agent name and sleep function

//Sleep function that takes time in ms as input and delays the process
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//User agents
const User_Agent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 IngredientAnalysisBot/2.0";

//Slugify means converting text into a URL-friendly format, often called a slug
function slugify(input) {
  const name = input.name;
  return name.toLowerCase().replace(/\s+/g, "-");
}

module.exports = { sleep, User_Agent, slugify };
