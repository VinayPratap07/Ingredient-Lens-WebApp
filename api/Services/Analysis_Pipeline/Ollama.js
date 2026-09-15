const { Ollama } = require("ollama");
const {
  dbReadySchema,
  SYSTEM_PROMPT,
} = require("../../Utils/AI_Helper_Function");

const ollama = new Ollama({
  host: "http://localhost:11434",
});

// Payload is the evidence we have fetched from multiple sites
async function summarizeEvidenceWithLlama(ingredientName, payload) {
  const response = await ollama.chat({
    model: "llama3.1:8b-instruct-q4_K_M",

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

    options: {
      temperature: 0,
    },

    format: dbReadySchema,
  });

  return JSON.parse(response.message.content);
}

module.exports = { summarizeEvidenceWithLlama };
