// firebase/firebaseAdmin.js
// const admin = require("firebase-admin");
// // const serviceAccount = require("../astrovendor-firebase-adminsdk.json");
// const serviceAccount = require("../ohmastrocustomer-firebase-adminsdk.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// module.exports = admin;
//====================================
// const admin = require("firebase-admin");

// // Load the appropriate service account file dynamically
// const loadServiceAccount = (role) => {
//   switch (role) {
//     case "customer":
//       return require("../ohmastrocustomer-firebase-adminsdk.json");
//     case "astrologer":
//       return require("../astrovendor-firebase-adminsdk.json");
//     default:
//       throw new Error("Invalid role for Firebase Admin initialization");
//   }
// };

// const initializeFirebaseAdmin = (role) => {
//   // Check if an app is already initialized
//   if (admin.apps.length === 0) {
//     const serviceAccount = loadServiceAccount(role);
//     admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount),
//     });
//   }
//   return admin;
// };

// module.exports = { initializeFirebaseAdmin };
//=============================================
// firebase/firebaseAdmin.js
const admin = require('firebase-admin');

const serviceAccounts = {
  customer: require('../astrologer-firebase-adminsdk-com.ohmastro.json'),
  astrologer: require('../astrologer-firebase-adminsdk-com.astroindia_astrologers.json')
};

const getFirebaseAdmin = (role = 'customer') => {
  const appName = `app-${role}`;
  
  // Return existing instance if already initialized
  if (admin.apps.find(app => app.name === appName)) {
    return admin.app(appName);
  }

  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccounts[role])
  }, appName);
};

module.exports = { getFirebaseAdmin };