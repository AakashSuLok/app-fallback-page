export default function handler(req, res) {
    const { name, phone } = req.query;

    const title = `Product for ${name}`;
    const description = `Call ${phone} for more details`;
    const imageUrl = "https://prod-website-a2j4h8t1f6.vignanam.guru/images/logo/Vignanam_Fire_Logo.png"; // Change this dynamically if needed
    // const redirectUrl = `https://yourdomain.com/firstPage?name=${name}&phone=${phone}`;

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta property="og:title" content="${title}" />
            <meta property="og:description" content="${description}" />
            <meta property="og:image" content="${imageUrl}" />
            // <meta property="og:url" content="${redirectUrl}" />
            // <meta http-equiv="refresh" content="0;url=${redirectUrl}" />
        </head>
        <body>
            <p>Redirecting...</p>
        </body>
        </html>
    `);
}
