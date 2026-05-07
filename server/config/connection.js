const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// If Aiven provides a MYSQL_URL (Production on Render)
if (process.env.MYSQL_URL) {
  sequelize = new Sequelize(process.env.MYSQL_URL, {
    dialect: 'mysql',
    logging: false, // Keep logs clean
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false // 🔐 This forces a secure connection without throwing warnings!
      }
    }
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

// require("dotenv").config();

// const Sequelize = require("sequelize");

// if (process.env.DB_PASSWORD === "ChangeMe!") {
//   console.error("Please update the .env file with your database password.");
//   process.exit(1);
// }

// const sequelize = process.env.JAWSDB_URL
//   ? new Sequelize(process.env.JAWSDB_URL)
//   : new Sequelize(
//       process.env.DB_DATABASE,
//       process.env.DB_USERNAME,
//       process.env.DB_PASSWORD,
//       {
//         host: process.env.DB_HOST,
//         dialect: process.env.DB_DIALECT,
//         port: process.env.DB_PORT,
//       }
//     );

// module.exports = sequelize;
