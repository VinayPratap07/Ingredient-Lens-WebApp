function SignUpValidationMiddleware(req, res, next) {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const trimmedFullName = fullName.trim();
  const trimmedEmail = email.trim();

  if (!trimmedFullName || !trimmedEmail || !password.trim()) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (trimmedFullName.length < 2) {
    return res
      .status(400)
      .json({ message: "Full name must be at least 2 characters" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters" });
  }

  if (!/[A-Z]/.test(password)) {
    return res
      .status(400)
      .json({ message: "Password must contain at least one uppercase letter" });
  }

  if (!/[a-z]/.test(password)) {
    return res
      .status(400)
      .json({ message: "Password must contain at least one lowercase letter" });
  }

  if (!/[0-9]/.test(password)) {
    return res
      .status(400)
      .json({ message: "Password must contain at least one number" });
  }

  next();
}

module.exports = { SignUpValidationMiddleware };
