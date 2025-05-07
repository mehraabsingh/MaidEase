const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fs = require("fs").promises;  // Refactored to use promises

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
        // Read the existing negotiations from negotiations.json
        const data = await fs.readFile("negotiations.json", "utf-8");
        let negotiations = data ? JSON.parse(data) : [];

        // Add the new negotiation
        negotiations.push({ offer, message, date: new Date() });

        // Save the updated negotiations to the file
        await fs.writeFile("negotiations.json", JSON.stringify(negotiations, null, 2));
        return res.status(200).json({ success: true, message: "Offer submitted successfully!" });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Error processing the file." });
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
