// Import required packages
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const sequelize = require("./config/connection");
const routes = require("./routes");

// Initialize Express application
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for any paths from the client
app.use(cors());

const PORT = process.env.PORT || 3001;

// Add routes
app.use('/api', routes);

// has the --rebuild parameter been passed as a command line param?
const rebuild = process.argv[2] === "--rebuild";

if (process.env.NODE_ENV === 'production') {
  // 1. On Render, look for the compiled React build folder
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
  });
} else {
  // 2. Locally, look for your standard public folder
  app.use(express.static(path.join(__dirname, "../client/public")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/public", "index.html"));
  });
}
// Serve static frontend files
// app.use(express.static(path.join(__dirname, "../client/public")));

// Handle GET request at the root route
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// }); 

// Sync database
sequelize.sync({ force: rebuild }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
