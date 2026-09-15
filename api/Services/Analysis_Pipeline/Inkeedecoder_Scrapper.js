const cheerio = require("cheerio");
const { slugify } = require("../../Utils/Pipeline_Helper_Function");

async function InkeedecoderScrapper(input) {
  const name = slugify(input);
  const url = `https://incidecoder.com/ingredients/${name}`;
  // const url = "https://inkeedecoder.com/ingredients/1-5-pentanediol";

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

    // console.log(html.slice(11000, 14000));

    const title = $("title").text().trim();
    const description = $('meta[name="description"]').attr("content") || "";
    const quickFacts = $("#quickfacts .starlist li")
      .map((_, el) => $(el).text().trim())
      .get();
    const geekyDetails = $("#details .showmore-section .content p")
      .map((_, el) => $(el).text().trim())
      .get();

    const imageUrl = $(".image picture img").attr("src") || null;

    const cosing = {
      functions: [],
      description: "",
    };

    $("#cosing-data .hidden").each((_, container) => {
      $(container)
        .children("div")
        .each((_, el) => {
          const text = $(el).text().trim();

          if (text.startsWith("All Functions:")) {
            cosing.functions = text
              .replace("All Functions:", "")
              .trim()
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean);
          }

          if (text.startsWith("Description:")) {
            cosing.description = text.replace("Description:", "").trim();
          }
        });
    });

    return [title, description, quickFacts, geekyDetails, cosing, imageUrl];
  } catch (error) {
    console.error("Scraping failed:", error.message);
    return [];
  }
}

module.exports = { InkeedecoderScrapper };

// InkeedecoderScrapper().then((data) => {
//   console.log(data);
// });
