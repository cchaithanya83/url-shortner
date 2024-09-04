const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// API to shorten a URL with a custom short URL
app.get('/initial-data', (req, res) => {
  const dummyData = {
    message: "Welcome to the URL Shortener!",
    info: "developed by Chaithanya K.",
    timestamp: new Date().toISOString()
  };

  res.status(200).json(dummyData);
});

app.post("/shorten", async (req, res) => {
  const { longUrl, shortCode } = req.body;

  if (!longUrl || !shortCode) {
    return res.status(400).json({ error: "Invalid input. Provide both longUrl and shortCode." });
  }

  try {
    // Check if the shortCode already exists

    const urlDoc = await db.collection("urls").doc(shortCode).get();

    if (urlDoc.exists) {
      return res.status(409).json({ error: "Short URL code already exists. Please choose another one." });
    }


    const shortUrl = `${req.protocol}://${req.get('host')}/${shortCode}`;
    console.log(shortUrl)

    // Save the longUrl with the provided shortCode
    await db.collection("urls").doc(shortCode).set({
      longUrl: longUrl,
      shortUrl: shortUrl,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return res.status(200).json({ shortUrl: shortUrl });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

// API to redirect to the original URL
app.get("/:shortCode", async (req, res) => {
  const shortCode = req.params.shortCode;
  console.log( req.params.shortCode)

  try {
    const urlDoc = await db.collection("urls").doc(shortCode).get();

    if (!urlDoc.exists) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    const { longUrl } = urlDoc.data();
    return res.redirect(longUrl);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
