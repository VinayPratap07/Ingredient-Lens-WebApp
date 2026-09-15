const { model, Schema } = require("mongoose");

const ingredientSearchSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  casNumber: {
    type: String,
    trim: true,
  },
  aliases: {
    type: [String],
    index: true,
  },
});

ingredientSearchSchema.set("toJSON", { virtuals: true });
ingredientSearchSchema.set("toObject", { virtuals: true });

ingredientSearchSchema.virtual("analysis", {
  ref: "IngredientAnalysis",
  localField: "_id",
  foreignField: "ingredient",
  justOne: true,
});

const IngredientSearch = model(
  "ingredientSearch",
  ingredientSearchSchema,
  "IngredientSearches",
);
module.exports = IngredientSearch;
