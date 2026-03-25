const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// If Render provides a DATABASE_URL, use it (Production)
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // 👈 CRITICAL for Render hosted DBs
      }
    }
  });
} else {
  // Fallback to local machine (Development)
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: '127.0.0.1',
      dialect: 'mysql', // or postgres if using local postgres
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
