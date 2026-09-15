//Importing Models
const IngredientSearch = require("../Models/IngredientSearch_Model");
const IngredientAnalysis = require("../Models/IngredientAnalysis_Model"); //Importing is required for it to be populated
const {
  ImageAnalysisResponse,
} = require("../Models/ImageAnalysisResponse_Model");

const fs = require("fs/promises");

//Importing services
const {
  ProcessPipeline,
} = require("../Services/Analysis_Pipeline/Process_Pipeline");
const { extractTextFromImage } = require("../Services/OCR_Services");

async function imageIngredientAnalysis(req, res) {
  const filePath = req.file?.path;

  if (!filePath) {
    return res.status(400).json({
      message: "No image uploaded",
    });
  }

  try {
    // Create the analysis document first
    const imageAnalysis = await ImageAnalysisResponse.create({
      User: req.user.id,
      status: "Processing",
      Analysis: null,
    });

    // Start processing in the background
    processImageAnalysis(filePath, imageAnalysis._id);

    console.log(imageAnalysis._id);

    // Immediately send the ID to frontend
    return res.status(202).json({
      message: "Image analysis started",
      analysisId: imageAnalysis._id,
    });
  } catch (error) {
    console.error(error);

    // Delete image if something failed before processing started
    try {
      await fs.unlink(filePath);
    } catch {}

    return res.status(500).json({
      message: "Failed to start image analysis",
    });
  }
}

async function getImageAnalysis(req, res) {
  try {
    const analysis = await ImageAnalysisResponse.findOne({
      _id: req.params.id,
      User: req.user.id,
    });

    console.log(req.user.id);

    if (!analysis) {
      return res.status(404).json({
        message: "Analysis not found",
      });
    }

    return res.status(200).json(analysis);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch analysis",
    });
  }
}

async function getAnalysisForOneIngredient(req, res) {
  const ingredientID = req.params.id;

  if (!ingredientID) {
    return res.status(400).json({
      message: "Ingredient not found!!!",
    });
  }

  try {
    const ingredient =
      await IngredientSearch.findById(ingredientID).populate("analysis");

    if (!ingredient) {
      return res.status(404).json({
        message: "Ingredient not found",
      });
    }

    // If analysis doesn't already exist, generate it
    if (!ingredient.analysis) {
      const analysisData = await ProcessPipeline(ingredient);

      await storeAnalysisInDb(ingredientID, analysisData);

      // Populate it again so we can return the complete data
      await ingredient.populate("analysis");
    }

    // Send data to user
    return res.status(200).json({
      message: "Analysis retrieved successfully",
      data: ingredient,
    });
  } catch (error) {
    console.error("Error getting ingredient analysis:", error);

    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

async function searchIngredients(req, res) {
  const { search } = req.query;

  console.log(search);

  if (!search || search.trim().length === 0) {
    return;
  }

  try {
    const result = await IngredientSearch.aggregate([
      {
        $search: {
          index: "ingredientSearch",
          text: {
            query: search,
            path: "name",
            fuzzy: {
              maxEdits: 1,
            },
          },
        },
      },
      {
        $limit: 10,
      },
    ]);

    if (!result) {
      return res
        .status(404)
        .json({ status: "Failed", message: "Ingredient not found" });
    }

    return res.status(200).json({ status: "Success", result });
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error.message });
  }
}

//Helper Functions

async function storeAnalysisInDb(ingredientId, analysis) {
  await IngredientAnalysis.create({
    ingredient: ingredientId,
    ...analysis,
  });
}

async function processImageAnalysis(filePath, analysisId) {
  try {
    // 1. Extract ingredients from image
    const response = await extractTextFromImage(filePath);

    const ingredients = response.ingredients;

    console.log(ingredients);

    // 2. Find ingredients in DB
    const matches = [];

    for (const ingredient of ingredients) {
      const match = await IngredientSearch.aggregate([
        {
          $search: {
            index: "ingredientSearch",
            compound: {
              should: [
                // Strong preference for exact name
                {
                  text: {
                    query: ingredient,
                    path: "name",
                    score: {
                      boost: {
                        value: 10,
                      },
                    },
                  },
                },

                // Search aliases
                {
                  text: {
                    query: ingredient,
                    path: "aliases",
                    score: {
                      boost: {
                        value: 8,
                      },
                    },
                  },
                },
              ],
              minimumShouldMatch: 1,
            },
          },
        },

        // Return only the best match
        {
          $limit: 1,
        },

        {
          $project: {
            _id: 1,
            name: 1,
            aliases: 1,
            casNumber: 1,
            analysis: 1,
            score: {
              $meta: "searchScore",
            },
          },
        },
      ]);

      if (match.length > 0) {
        matches.push(match[0]);
      }
    }

    // Get actual MongoDB documents
    const ingredientIds = matches.map((match) => match._id);

    //Populating the searches
    const results = await IngredientSearch.find({
      _id: { $in: matches },
    }).populate("analysis");

    // 3. Analyze ingredients that don't already have analysis
    for (const element of results) {
      if (!element.analysis) {
        const ingredient = {
          name: element.name,
          aliases: element.aliases,
        };

        const analysis = await ProcessPipeline(ingredient);

        await storeAnalysisInDb(element._id, analysis);
      }
    }

    // 4. Fetch final results
    const finalResults = await IngredientSearch.find({
      _id: { $in: ingredientIds },
    }).populate("analysis");

    // 5. Store complete analysis
    await ImageAnalysisResponse.findByIdAndUpdate(analysisId, {
      status: "Completed",
      Analysis: finalResults,
    });
  } catch (error) {
    console.error("Image analysis failed:", error);

    await ImageAnalysisResponse.findByIdAndUpdate(analysisId, {
      status: "Failed",
      Analysis: {
        message: error.message,
      },
    });
  } finally {
    try {
      await fs.unlink(filePath);
    } catch (deleteError) {
      console.error("Failed to delete uploaded file:", deleteError);
    }
  }
}

module.exports = {
  imageIngredientAnalysis,
  getAnalysisForOneIngredient,
  getImageAnalysis,
  searchIngredients,
};
