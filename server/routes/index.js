const router = require("express").Router();
const memeRoutes = require('./meme');
const userRoutes = require("./user");

// create a default route for /api
router.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

router.use('/caption', meme);

router.use("/api/users", userRoutes);
router.use('/api/memes', memeRoutes);

module.exports = router;
