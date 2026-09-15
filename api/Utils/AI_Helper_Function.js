//This file consists the Prompt and the Schema we need to pass to the Gemini function
const { Type } = require("@google/genai");

const SYSTEM_PROMPT = `
You are an evidence-based cosmetic chemistry research assistant.

Use ONLY the supplied PubMed abstracts.

Rules:
- Every benefit and risk must be directly supported by supplied evidence.
- Prefer human clinical and observational evidence.
- Do not use animal/veterinary studies for human skincare claims.
- Do not treat drug delivery, membrane flux, nanoparticles, solubility, or molecular mechanisms as cosmetic benefits.
- Benefits must describe simple consumer-relevant cosmetic outcomes.
- whatItDoes must use standard cosmetic functions, not molecular mechanisms.
- Never claim "clinically proven", "guaranteed", or "completely safe".
- Every benefit/risk must cite one or more supplied PMIDs.
- Compatibility values must be Great, Neutral, Caution, Avoid, or Insufficient evidence.
- Use Insufficient evidence when human evidence is inadequate.
- Never invent evidence.
- If evidence is insufficient or irrelevant, return empty benefits/risks and Insufficient evidence for compatibility.
`;

const dbReadySchema = {
  type: "object",
  additionalProperties: false,

  properties: {
    name: {
      type: "string",
    },

    description: {
      type: "string",
    },

    skinCompatibility: {
      type: "object",
      additionalProperties: false,

      properties: {
        oily: {
          type: "string",
          enum: [
            "Great",
            "Neutral",
            "Caution",
            "Avoid",
            "Insufficient evidence",
          ],
        },

        dry: {
          type: "string",
          enum: [
            "Great",
            "Neutral",
            "Caution",
            "Avoid",
            "Insufficient evidence",
          ],
        },

        sensitive: {
          type: "string",
          enum: ["Great", "Caution", "Avoid", "Insufficient evidence"],
        },

        acneProne: {
          type: "string",
          enum: [
            "Great",
            "Neutral",
            "Caution",
            "Avoid",
            "Insufficient evidence",
          ],
        },
      },

      required: ["oily", "dry", "sensitive", "acneProne"],
    },

    potentialRisks: {
      type: "array",

      items: {
        type: "object",
        additionalProperties: false,

        properties: {
          description: {
            type: "string",
          },

          evidence: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },

        required: ["description", "evidence"],
      },
    },

    benefits: {
      type: "array",

      items: {
        type: "object",
        additionalProperties: false,

        properties: {
          description: {
            type: "string",
          },

          evidence: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },

        required: ["description", "evidence"],
      },
    },

    whatItDoes: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },

  required: [
    "name",
    "description",
    "skinCompatibility",
    "potentialRisks",
    "benefits",
    "whatItDoes",
  ],
};

// const dbReadySchemaForGemini = {
//   type: Type.OBJECT,
//   properties: {
//     name: { type: Type.STRING },
//     aliases: {
//       type: Type.ARRAY,
//       items: { type: Type.STRING },
//       description:
//         "Known INCI variations, common names, or botanical synonyms.",
//     },
//     description: {
//       type: Type.STRING,
//       description:
//         "Short, factual, consumer-friendly explanation of what the ingredient is.",
//     },
//     skinCompatibility: {
//       type: Type.OBJECT,
//       properties: {
//         oily: {
//           type: Type.STRING,
//           enum: [
//             "Great",
//             "Neutral",
//             "Caution",
//             "Avoid",
//             "Insufficient evidence",
//           ],
//         },
//         dry: {
//           type: Type.STRING,
//           enum: [
//             "Great",
//             "Neutral",
//             "Caution",
//             "Avoid",
//             "Insufficient evidence",
//           ],
//         },
//         sensitive: {
//           type: Type.STRING,
//           enum: ["Great", "Caution", "Avoid", "Insufficient evidence"],
//         },
//         acneProne: {
//           type: Type.STRING,
//           enum: [
//             "Great",
//             "Neutral",
//             "Caution",
//             "Avoid",
//             "Insufficient evidence",
//           ],
//         },
//       },
//       required: ["oily", "dry", "sensitive", "acneProne"],
//     },
//     potentialRisks: {
//       type: Type.ARRAY,
//       items: {
//         type: Type.OBJECT,
//         properties: {
//           description: { type: Type.STRING },
//           evidence: {
//             type: Type.ARRAY,
//             items: { type: Type.STRING },
//             description: "Array of supporting PMIDs.",
//           },
//         },
//         required: ["description", "evidence"],
//       },
//     },
//     benefits: {
//       type: Type.ARRAY,
//       items: {
//         type: Type.OBJECT,
//         properties: {
//           description: { type: Type.STRING },
//           evidence: {
//             type: Type.ARRAY,
//             items: { type: Type.STRING },
//             description: "Array of supporting PMIDs.",
//           },
//         },
//         required: ["description", "evidence"],
//       },
//     },
//     whatItDoes: {
//       type: Type.ARRAY,
//       items: { type: Type.STRING },
//       description:
//         "Standard cosmetic functions (e.g., Exfoliant, Soothing, Antioxidant).",
//     },
//   },
//   required: [
//     "name",
//     "aliases",
//     "description",
//     "skinCompatibility",
//     "potentialRisks",
//     "benefits",
//     "whatItDoes",
//   ],
// };

module.exports = { SYSTEM_PROMPT, dbReadySchema };
