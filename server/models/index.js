// import all models
// const Category = require("./category");
const User = require("./user.js");
const Meme = require("./meme.js");

User.hasMany(Meme, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Meme.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = {
  User,
  Meme,
};
