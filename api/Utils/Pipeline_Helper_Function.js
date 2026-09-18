//This file consists of the common funciton needed by our pipeline like the agent name and sleep function

//Sleep function that takes time in ms as input and delays the process
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//User agents
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140 Safari/537.36";

//Slugify means converting text into a URL-friendly format, often called a slug
function slugify(input) {
  const name = input.name;
  return name.toLowerCase().replace(/\s+/g, "-");
}

module.exports = { sleep, USER_AGENT, slugify };
