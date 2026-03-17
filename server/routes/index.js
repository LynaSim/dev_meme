const router = require("express").Router();

const meme = require('./meme');
const memePaths = require('./memeRoutes');
const userRoutes = require("./user");

// create a default route for /api
router.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

router.use('/caption', meme);

router.use("/api/users", userRoutes);
router.use('/meme', memePaths);

module.exports = router;
