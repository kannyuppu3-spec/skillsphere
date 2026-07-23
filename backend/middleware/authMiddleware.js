const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  console.log("====== AUTH ======");
  console.log("Authorization:", req.headers.authorization);
  console.log("JWT Secret:", process.env.JWT_SECRET);

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];

    console.log("Received Token:", token);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("Verified:", decoded);

      req.user = decoded;

      return next();
    } catch (err) {
      console.log("Verify Error:", err.message);
      console.log("Decoded:", jwt.decode(token));

      return res.status(401).json({
        message: err.message,
      });
    }
  }

  return res.status(401).json({
    message: "No Token Found",
  });
};

module.exports = { protect };