const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// If Aiven provides a MYSQL_URL (Production on Render)
if (process.env.MYSQL_URL) {
  sequelize = new Sequelize(process.env.MYSQL_URL, {
    dialect: 'mysql',
    logging: false, // Keep logs clean
  });
} else {
  // Fallback to your Local Computer (Development)
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: '127.0.0.1',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;