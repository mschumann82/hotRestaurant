// Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Table Reservations (DATA)
// =============================================================
let tables = [
];

// Waitlist (DATA)
// =============================================================
let waitlist = [
  ];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
  });

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays tables
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

// Displays waitlist
app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
  });

// Create New Characters - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  const newreservation = req.body;

  console.log(newreservation);

  if (tables.length > 4) {
      waitlist.push(newreservation);
      res.json(newreservation); 
  } else {
      tables.push(newreservation);
    
      res.json(newreservation);
  }

 });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
