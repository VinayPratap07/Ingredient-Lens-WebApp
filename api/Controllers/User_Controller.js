const {
  ImageAnalysisResponse,
} = require("../Models/ImageAnalysisResponse_Model");
const User = require("../Models/User_Model");

//Register user function
async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(422).json({ message: "All fileds are Required" });
  }

  try {
    const user = await User.create({
      fullName,
      email,
      password,
    });

    return res
      .status(201)
      .json({ message: "User created Successfully", userId: user._id });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      const fields = Object.Keys(error.KeyPattern)[0];

      return res.status(409).json({ message: `${fields} already exists` });
    }

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

async function logInUser(req, res) {
  const { identifier, password } = req.body;
  if (!identifier || !password) {
    return res.status(422).json({ Message: "Both fields are required" });
  }
  try {
    const token = await User.matchPasswordAndGenerateToken(
      identifier,
      password,
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({ message: "User logged in" });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
}

async function getUser(req, res) {
  const id = req.user.id;

  try {
    const user = await User.findById(id).select("-salt -password");
    const analysis = await ImageAnalysisResponse.find({ User: id });

    if (!user) {
      return res
        .status(404)
        .json({ Success: "flase", message: "User not found" });
    }

    return res.status(200).json({ Success: "true", user, analysis });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function logOutUser(req, res) {
  const user = req.user.id;

  if (!user) return res.json({ message: "User already logged Out" });

  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "User Logged out" });
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = { registerUser, logInUser, getUser, logOutUser };
