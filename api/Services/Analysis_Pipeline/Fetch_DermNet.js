const { sleep, USER_AGENT } = require("../../Utils/Pipeline_Helper_Function");

async function fetchDermNet(ingredientName) {
  //Clean text function

  const searchUrl = `https://dermnetnz.org/search?q=${encodeURIComponent(ingredientName)}`;

  try {
    const res = await fetch(searchUrl, {
      headers: { "User-Agent": USER_AGENT },
      signal: AbortSignal.timeout(4000),
    });

    if (!res.ok) return [];

    const html = await res.text();

    const linkMatch = html.match(/href="(\/topics\/[^"]+)"/i);

    if (linkMatch && linkMatch[1]) {
      const topicUrl = `https://dermnetnz.org${linkMatch[1]}`;
      await sleep(250);

      const pageRes = await fetch(topicUrl, {
        headers: { "User-Agent": User_Agent },
        signal: AbortSignal.timeout(4000),
      });

      if (pageRes.ok) {
        const pageHtml = await pageRes.text();

        //Write a code to extract info from HTML page
        // const textContent = cleanHtmlContent(pageHtml).slice(0, 300);

        if (pageHtml.length > 100) {
          return [
            {
              source: "DermNet",
              url: topicUrl,
              title: `DermNet: ${ingredientName}`,
              content: pageHtml,
            },
          ];
        } else {
          return [];
        }
      }
    }
  } catch (error) {
    console.warn(
      `DermNet NZ lookup yielded no content for '${ingredientName}':`,
      error.message,
    );
  }
}

module.exports = { fetchDermNet };
