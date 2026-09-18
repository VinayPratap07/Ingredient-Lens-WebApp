const cheerio = require("cheerio");
const { slugify, USER_AGENT } = require("../../Utils/Pipeline_Helper_Function");

async function dermNetScraper(input) {
  const ingredient = slugify(input);
  const url = `https://dermnetnz.org/topics/${ingredient}`;

  const data = {
    name: "",
    description: "",
    whatItDoes: "",
    uses: [],
    preparations: [],
    sideEffects: [],
    precautions: [],
    source: {
      name: "DermNet",
      url,
    },
  };

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": USER_AGENT,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const whatIsHeading = $("h2")
      .filter((_, el) =>
        $(el).text().trim().toLowerCase().startsWith("what is"),
      )
      .first();

    if (whatIsHeading.length) {
      const paragraph = whatIsHeading.next("p");

      data.description = paragraph.text().trim();

      // Get the list immediately after description
      paragraph
        .next("ul")
        .find("li")
        .each((_, el) => {
          const text = $(el).text().trim();

          if (text) {
            data.uses.push(text);
          }
        });
    }

    const howWorksHeading = $("h2")
      .filter((_, el) =>
        $(el).text().trim().toLowerCase().startsWith("how does"),
      )
      .first();

    if (howWorksHeading.length) {
      const paragraphs = [];

      let current = howWorksHeading.next();

      while (current.length && !current.is("h2")) {
        if (current.is("p")) {
          const text = current.text().trim();

          if (text) {
            paragraphs.push(text);
          }
        }

        current = current.next();
      }

      data.whatItDoes = paragraphs.join(" ");
    }

    if (preparationHeading.length) {
      const table = preparationHeading.nextAll("table").first();

      table.find("tbody tr").each((_, row) => {
        const columns = $(row)
          .find("td")
          .map((_, td) => $(td).text().trim())
          .get();

        if (columns.length >= 3) {
          data.preparations.push({
            preparation: columns[0],
            form: columns[1],
            indications: columns[2],
          });
        }
      });
    }

    const sideEffectsHeading = $("h2")
      .filter((_, el) =>
        $(el).text().trim().toLowerCase().includes("side effects"),
      )
      .first();

    if (sideEffectsHeading.length) {
      let current = sideEffectsHeading.next();

      while (current.length && !current.is("h2")) {
        if (current.is("ul")) {
          current.find("li").each((_, li) => {
            const text = $(li).text().trim();

            if (text) {
              data.sideEffects.push(text);
            }
          });
        }

        current = current.next();
      }
    }

    const precautionsHeading = $("h2")
      .filter((_, el) =>
        $(el).text().trim().toLowerCase().includes("precautions"),
      )
      .first();

    if (precautionsHeading.length) {
      let current = precautionsHeading.next();

      while (current.length && !current.is("h2")) {
        if (current.is("ul")) {
          current.find("li").each((_, li) => {
            const text = $(li).text().trim();

            if (text) {
              data.precautions.push(text);
            }
          });
        }

        current = current.next();
      }
    }

    return data;
  } catch (error) {
    console.error("DermNet scraping failed:", error.message);

    return null;
  }
}

module.exports = { dermNetScraper };
