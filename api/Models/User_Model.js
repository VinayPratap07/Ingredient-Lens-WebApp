const { model, Schema } = require("mongoose");
const { randomBytes, createHmac } = require("crypto");
const { createTokenForUser } = require("../Services/JWT_Auth_Services");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

//Pre save function that runs when a new user is created
//It is used to hash password and store password and salt in the db
userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = randomBytes(16).toString("hex");

  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;
});

userSchema.statics.matchPasswordAndGenerateToken = async function (
  identifier,
  password,
) {
  const user = await this.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });

  if (!user) throw new Error("Invalid credentials");

  //Re-hash password to match with older password
  const userProvidedHash = createHmac("sha256", user.salt)
    .update(password)
    .digest("hex");

  if (userProvidedHash !== user.password)
    throw new Error("Invalid Credentials");

  return createTokenForUser(user);
};

const User = model("User", userSchema);
module.exports = User;
