const router = require("express").Router();
const memePaths = require('./memeRoutes');
const userRoutes = require("./user");

// create a default route for /api
router.get("/api", (req, res) => {
  res.json({ message: "Welcome to the API" });
});


router.use("/api/users", userRoutes);
router.use('/meme', memePaths);

module.exports = router;
