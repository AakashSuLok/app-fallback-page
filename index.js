const express = require("express");
const fs = require("fs");
const path = require("path");


const app = express();
const PORT = process.env.PORT || 3000;

// Function to serve the HTML file with dynamic values
const servePage = (req, res) => {
    const title = req.query.title || "Guest";
    const imageUrl = req.query.image || "";
    const description = req.query.description || "Description";

    fs.readFile(path.join(__dirname, "index.html"), "utf8", (err, data) => {
        if (err) {
            res.status(500).send("Error loading the page");
            return;
        }
        const modifiedHtml = data
            .replace("{{name}}", title)
            .replace("{{desc}}", description)
            .replace("{{image}}", imageUrl);
        res.send(modifiedHtml);
    });
};

// Handle requests with and without a page
app.get("/", servePage); // Default route when no page is specified
app.get("/:page", servePage); // Dynamic route for any page

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
