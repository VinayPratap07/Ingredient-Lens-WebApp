const { GoogleGenAI, Type } = require("@google/genai");
const fs = require("fs");

const AI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function extractTextFromImage(imagePath) {
  const imageData = fs.readFileSync(imagePath);

  const base64Image = imageData.toString("base64");

  const response = await AI.models.generateContent({
    model: "gemini-3.6-flash",
    contents: [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image,
        },
      },
      {
        text: `Look at this cosmetic product image.

          Extract ONLY the ingredients from the ingredient list.

          Rules:
          - Transcribe the ingredients exactly as visible.
          - Do not invent or add ingredients.
          - Correct obvious OCR-like spelling mistakes when the intended
            ingredient is unambiguous.
          - Preserve ingredient names such as "Caprylic/Capric Triglyceride".
          - Ignore marketing text, product description, directions,
            warnings, manufacturer information, etc.
          - Return an empty array if no ingredient list is visible.
          - Return the text in all upper case letter`,
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          ingredients: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },
        },
        required: ["ingredients"],
      },
    },
  });

  return JSON.parse(response.text);
}

module.exports = { extractTextFromImage };
