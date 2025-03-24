const express = require("express");
const fs = require("fs");
const path = require("path");
const axios = require("axios"); // Add axios for API calls

const app = express();
const PORT = process.env.PORT || 3000;

// Serve .well-known directory statically
app.use("/.well-known", express.static(path.join(__dirname, ".well-known")));

// Function to serve the HTML file with dynamic values
const servePage = async (req, res) => {
    const title = req.query.title || "SuLok";
    const imageUrl = req.query.image || "";
    const description = req.query.description || "A Social Network for Organization.";

    // Check if the request contains a deep link
    const deepLinkId = req.params.id;
    const deepLinkType = req.params.type;

    let apiData = {};
    if (deepLinkId && deepLinkType) {
        console.log("Fetching data from API");
        try {
            const response = await axios.get(`https://links-api-i5vi3qr5ex.staging.sulok.app/link`, {
                params: { id: deepLinkId, type: deepLinkType },
                headers: { 'x-api-key': 'uC3NXUqcsk8AIcOPKKx4Oawr1qJdAjcyaJ3IkbSu' }
            });
            apiData = response.data;

        } catch (error) {
            console.error("Error fetching API data:", error);
        }
    }

    // Serve the HTML file with dynamic values
    const filePath = path.join(__dirname, "index.html");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading HTML file:", err);
            res.status(500).send("Internal Server Error");
            return;
        }

        let htmlContent = data
            .replace(/{{name}}/g, apiData.Title || title)
            .replace(/{{image}}/g, apiData.ImageUrl || imageUrl)
            .replace(/{{desc}}/g, apiData.Description || description)
            .replace(/{{apiData}}/g, JSON.stringify(apiData));

        res.send(htmlContent);
    });
};

// Handle requests with and without a page
app.get("/:type/:id", servePage); // Dynamic route for any page

// Middleware to handle unmatched routes and serve default HTML page
app.use((req, res) => {
    const filePath = path.join(__dirname, "index.html");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading default HTML file:", err);
            res.status(500).send("Internal Server Error");
            return;
        }
        res.send(data);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
