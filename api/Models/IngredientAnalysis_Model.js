const { model, Schema } = require("mongoose");

const ingredientAnalysisSchema = new Schema(
  {
    ingredient: {
      type: Schema.Types.ObjectId,
      ref: "ingredientSearch",
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    skinCompatibility: {
      oily: {
        type: String,
        default: "Insufficient evidence",
      },
      dry: {
        type: String,
        default: "Insufficient evidence",
      },
      sensitive: {
        type: String,
        default: "Insufficient evidence",
      },
      acneProne: {
        type: String,
        default: "Insufficient evidence",
      },
    },
    benefits: [
      {
        description: String,
        evidence: [{ type: String }],
      },
    ],
    potentialRisks: [
      {
        description: String,
        evidence: [{ type: String }],
      },
    ],
    whatItDoes: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

const IngredientAnalysis = model(
  "IngredientAnalysis",
  ingredientAnalysisSchema,
);

module.exports = IngredientAnalysis;
