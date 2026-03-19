// import all models
// const Category = require("./category");
const User = require("./user.js");
const Meme = require("./meme.js");

User.hasMany(Meme, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Meme.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = {
  User,
  Meme,
};