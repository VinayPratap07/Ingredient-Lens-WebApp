const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");

//Imports
const { connectDB } = require("./Config_DB/connnect");
const {
  checkUserForAuthenticaton,
  requireAuthenticaton,
} = require("./Middlewares/Authenticaton_Middleware");

//Routes
const UserRoutes = require("./Routes/User_Routes");
const AnalysisRoutes = require("./Routes/Analysis_Routes");

const app = express();
const PORT = process.env.PORT;

//CORS Origin
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

//Connecting MongoDB
connectDB();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkUserForAuthenticaton("token"));
app.use(cors(corsOptions));

//Routes
app.use("/api/user", UserRoutes);
app.use("/api/analysis", requireAuthenticaton, AnalysisRoutes);
// app.use("/api/analysis", AnalysisRoutes);

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
