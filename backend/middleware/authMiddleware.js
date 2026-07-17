const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  console.log("Authorization Header:", req.headers.authorization);
  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      console.log("Received Token:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("Decoded Token:", decoded);

      req.user = decoded;

      return next();
    } catch (error) {
      console.log("JWT Verify Error:", error.message);
console.log("Received Token:", token);

const decoded = jwt.decode(token);

console.log("Decoded Without Verify:", decoded);
      return res.status(401).json({
        message: "Not Authorized"
      });
    }
  }

  return res.status(401).json({
    message: "No Token Found"
  });
};

module.exports = { protect };