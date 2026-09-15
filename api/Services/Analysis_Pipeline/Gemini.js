const { GoogleGenAI } = require("@google/genai");
const {
  dbReadySchema,
  SYSTEM_PROMPT,
} = require("../../Utils/AI_Helper_Function");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// process.env.GEMINI_API_KEY ||

const AI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

//ingredientName: The ingredient you're researching.
//articles: An array of articles produced by your previous PubMed function.
async function summmarizeEvidenceWithGemini(ingredientName, articles) {
  if (!articles || articles.length === 0) {
    return {
      target_ingredient: ingredientName,
      evidence: [],
      summary: "No evidence found.",
    };
  }

  //Take every article except those classified as Veterinary
  const humanAndLabArticles = articles.filter(
    (a) => a.population !== "Veterinary",
  );

  const articlesToSend =
    humanAndLabArticles.length > 0 ? humanAndLabArticles : articles;

  //the actual data going to give Gemini.
  const payload = {
    target_ingredient: ingredientName,
    candidate_articles: articlesToSend.map((a) => ({
      pmid: a.pmid,
      title: a.title,
      journal: a.journal,
      year: a.year,
      studyType: a.studyType,
      population: a.population,
      relevance: a.relevance,
      abstract: a.abstract,
    })),
  };

  const response = await AI.models.generateContent({
    model: "gemini-3.5-flash",
    contents: `Analyze the following classified PubMed candidate articles for '${ingredientName}':\n${JSON.stringify(payload, null, 2)}`,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: "application/json",
      responseSchema: dbReadySchema,
      temperature: 0.0,
    },
  });

  //JSON.parse() converts the ai response back into a JavaScript object from json
  const parsedAIResponse = JSON.parse(response.text);

  parsedAIResponse.evidence = articlesToSend.map(
    ({
      source,
      pmid,
      title,
      journal,
      year,
      studyType,
      population,
      relevance,
    }) => ({
      source,
      pmid,
      title,
      journal,
      year,
      studyType,
      population,
      relevance,
    }),
  );

  return parsedAIResponse;
}

module.exports = { summmarizeEvidenceWithGemini };
