// import all models
// const Category = require("./category");
const User = require("./user.js");
const Meme = require("./meme.js");

User.hasMany(Meme, {
  foreignKey: "postedBy",
  onDelete: "CASCADE",
});

Meme.belongsTo(User, {
  foreignKey: "postedBy",
});

module.exports = {
  User,
  Meme,
};