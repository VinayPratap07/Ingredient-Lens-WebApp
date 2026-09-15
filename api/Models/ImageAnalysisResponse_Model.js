const { Schema, model } = require("mongoose");

const ImageAnalysis = new Schema(
  {
    status: {
      type: String,
      required: true,
      enum: ["Processing", "Failed", "Completed"],
      default: "Processing",
    },
    User: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Analysis: {
      type: Schema.Types.Mixed,
      default: null,
    },
  },
  { timestamps: true },
);

const ImageAnalysisResponse = model("ImageAnalysisResponse", ImageAnalysis);

module.exports = { ImageAnalysisResponse };
