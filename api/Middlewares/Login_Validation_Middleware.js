function SignUpValidationMiddleware(req, res, next) {
  const { fullname, email, password } = req.body;

  // Check required fields
  if (!fullname || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  // Full name validation
  if (fullname.trim().length < 2) {
    return res.status(400).json({
      message: "Full name must be at least 2 characters",
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email address",
    });
  }

  // Password validation
  if (password.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters",
    });
  }

  if (!/[A-Z]/.test(password)) {
    return res.status(400).json({
      message: "Password must contain at least one uppercase letter",
    });
  }

  if (!/[a-z]/.test(password)) {
    return res.status(400).json({
      message: "Password must contain at least one lowercase letter",
    });
  }

  if (!/[0-9]/.test(password)) {
    return res.status(400).json({
      message: "Password must contain at least one number",
    });
  }

  // Everything is valid
  next();
}

module.exports = { SignUpValidationMiddleware };
