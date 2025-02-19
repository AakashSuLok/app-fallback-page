const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Handle dynamic paths
app.get("/:page", (req, res) => {
    const { page } = req.params; // Capture dynamic page name
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
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
