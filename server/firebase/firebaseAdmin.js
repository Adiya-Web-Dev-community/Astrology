// firebase/firebaseAdmin.js
const admin = require("firebase-admin");
const serviceAccount = require("../astrovendor-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
