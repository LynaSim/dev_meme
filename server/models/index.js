// import all models
// const Category = require("./category");
const User = require("./user");
const Meme = require("./meme");

User.hasMany(Meme, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Meme.belongsTo(User, {
  foreignKey: "meme_id",
});

module.exports = {
  User,
  Meme,
};
