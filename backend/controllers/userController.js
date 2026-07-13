const getProfile = async (req, res) => {
  res.json({
    message: "Protected Route Accessed",
    user: req.user
  });
};

module.exports = {
  getProfile
};