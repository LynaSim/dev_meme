const router = require("express").Router();
const memeRoutes = require('./meme');
const userRoutes = require("./user");

// create a default route for /api
router.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

router.use('/caption_image', memeRoutes);

router.use("/users", userRoutes);
router.use('/memes', memeRoutes);

module.exports = router;
