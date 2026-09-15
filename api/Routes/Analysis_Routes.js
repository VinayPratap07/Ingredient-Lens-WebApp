const { Router } = require("express");
const {
  imageIngredientAnalysis,
  getAnalysisForOneIngredient,
  getIngredients,
  getImageAnalysis,
  searchIngredients,
} = require("../Controllers/Ingredient_Analysis_Controller");
const { upload } = require("../Middlewares/Multer_Middleware");

const router = Router();

router.post("/imageAnalysis", upload.single("image"), imageIngredientAnalysis);
router.get("/searchIngredient", searchIngredients);
router.get("/imageAnalysis/:id", getImageAnalysis);
router.get("/getSingleIngredient/:id", getAnalysisForOneIngredient);

module.exports = router;
