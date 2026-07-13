const adminOnly = (req, res, next) => {
    console.log("User from JWT:", req.user);

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access Denied. Admins only."
    });
  }

  next();
};

module.exports = {
  adminOnly,
};