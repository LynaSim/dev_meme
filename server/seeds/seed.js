// Import required packages
const sequelize = require("../config/connection");

// import models
const User = require("../models/user");
const Meme = require("../models/meme");

// add data and seeding for meme model

// import seed data
const userData = require("./users.json");
const memeData = require("./memes.json");

// Seed database
const seedDatabase = async () => {
  try {
  await sequelize.sync({ force: true });
  await User.bulkCreate(userData, { individualHooks: true});
  await Meme.bulkCreate(memeData);

  process.exit(0);
} catch (err) { 
  console.error("Seeding failed, err");
  process.exit(1); //this means "Uncaught Error/Failure"
  }
};

// Call seedDatabase function
seedDatabase();