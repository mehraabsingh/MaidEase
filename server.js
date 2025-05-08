const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config(); // To use the .env file for environment variables

const app = express();
const PORT = 3000;

// Set up middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve static files (like CSS, images, JS files)
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });

// Define a schema for the negotiations
const negotiationSchema = new mongoose.Schema({
  offer: String,
  message: String,
  date: { type: Date, default: Date.now }
});

// Create a model based on the schema
const Negotiation = mongoose.model("Negotiation", negotiationSchema);

// Route for the index page (index.ejs)
app.get("/", (req, res) => {
    res.render("index");
});

// Route for index2 page (index2.ejs)
app.get("/index2", (req, res) => {
    res.render("index2");
});

// Route for index3 page (index3.ejs)
app.get("/index3", (req, res) => {
    res.render("index3");
});

// Handle form submission (negotiation form)
app.post("/submit-negotiation", async (req, res) => {
    const { offer, message } = req.body;

    if (!offer || !message) {
        return res.status(400).json({ success: false, message: "Offer and message are required." });
    }

    try {
        // Create a new negotiation document and save it to MongoDB
        const newNegotiation = new Negotiation({
            offer,
            message
        });

        await newNegotiation.save();
        return res.status(200).json({ success: true, message: "Offer submitted successfully!" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Error processing the request." });
    }
});

// Error-handling middleware (must be placed at the end of the route definitions)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
