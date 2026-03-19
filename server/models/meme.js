const { Model, Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Meme extends Model {}

Meme.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    postedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user', // maps to User model
        key: 'id',
      },    
    },
    text0: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdOn: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "meme",
  }
);

// Export Meme model
module.exports = Meme;
