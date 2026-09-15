const { Router } = require("express");
const {
  registerUser,
  logInUser,
  getUser,
  logOutUser,
} = require("../Controllers/User_Controller");
const {
  requireAuthenticaton,
} = require("../Middlewares/Authenticaton_Middleware");
const {
  SignUpValidationMiddleware,
} = require("../Middlewares/Login_Validation_Middleware");

const router = Router();

router.post("/register", SignUpValidationMiddleware, registerUser);
router.post("/login", logInUser);
router.get("/getUser", requireAuthenticaton, getUser);
router.post("/logout", logOutUser);

module.exports = router;
