// ~/functions/index.js or ~/server/api/verify-token.js
const admin = require('./firebaseAdmin'); // Firebase Admin setup
const express = require('express');
const app = express();

app.use(express.json());

app.post('/verify-token', async (req, res) => {
  try {
    const { token } = req.body;

    // Verify the Kinde token
    const decodedToken = await admin.auth().verifyIdToken(token);

    // You can use the decodedToken to generate Firebase Custom Token
    const customToken = await admin.auth().createCustomToken(decodedToken.uid);

    // Return the custom token to the client
    res.json({ customToken });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).send('Invalid token');
  }
});

module.exports = app;
