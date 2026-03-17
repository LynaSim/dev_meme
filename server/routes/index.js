const router = require("express").Router();

const meme = require('./meme');

// create a default route for /api
router.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

router.use('/caption', meme);

module.exports = router;
