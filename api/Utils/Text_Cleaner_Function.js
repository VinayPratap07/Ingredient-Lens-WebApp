function cleanText(text) {
  if (typeof text !== "string") {
    return "";
  }

  return text
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[^\p{L}\p{N}\s'-]/gu, "")
    .toUpperCase();
}

module.exports = { cleanText };
