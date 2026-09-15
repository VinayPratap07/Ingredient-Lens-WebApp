const Groq = require("groq-sdk");
const {
  SYSTEM_PROMPT,
  dbReadySchema,
} = require("../../Utils/AI_Helper_Function");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

//Payload is the evidence we have fetched form multiple sites
async function summmarizeEvidenceWithGroq(ingredientName, payload) {
  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",

    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: `Analyze the following classified PubMed candidate articles for '${ingredientName}':
${JSON.stringify(payload)}`,
      },
    ],

    temperature: 0.0,

    response_format: {
      type: "json_schema",
      json_schema: {
        name: "db_ready",
        schema: dbReadySchema,
        strict: true,
      },
    },
  });

  return JSON.parse(response.choices[0].message.content);
}

module.exports = { summmarizeEvidenceWithGroq };
