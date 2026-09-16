const cheerio = require("cheerio");
const { slugify } = require("../../Utils/Pipeline_Helper_Function");

async function skinSort(ingredient) {
  const name = slugify(ingredient);
  const url = `https://skinsort.com/ingredients/${name}`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const name = $("h1").first().text().trim();

    const descriptionContainer = $(".ingredient-description").first();

    const description = descriptionContainer
      .find("p")
      .first()
      .text()
      .replace(/\s+/g, " ")
      .trim();

    const benefits = [];

    descriptionContainer.find("li").each((_, el) => {
      benefits.push($(el).text().replace(/\s+/g, " ").trim());
    });

    const insights = [];

    $("div[x-data*='toggle']").each((_, container) => {
      const button = $(container).children("button").first();

      if (!button.length) return;

      const title = button
        .clone()
        .children()
        .remove()
        .end()
        .text()
        .replace(/\s+/g, " ")
        .trim();

      const explanation = $(container)
        .find(".prose")
        .first()
        .text()
        .replace(/\s+/g, " ")
        .trim();

      if (!title) return;

      if (
        title.startsWith("Good for") ||
        title.startsWith("Helps with") ||
        title.startsWith("Can worsen")
      ) {
        insights.push({
          title,
          explanation,
        });
      }
    });

    const references = [];

    $("a[href]").each((_, el) => {
      const href = $(el).attr("href");

      if (
        href &&
        (href.includes("ncbi.nlm.nih.gov") ||
          href.includes("pubmed.ncbi.nlm.nih.gov"))
      ) {
        if (!references.includes(href)) {
          references.push(href);
        }
      }
    });

    return [name, description, benefits, insights, references];
  } catch (error) {
    console.error("SkinSort scraping failed:", error.message);
    return null;
  }
}

module.exports = { skinSort };
