const admin = require("firebase-admin");

const serviceAccount = require("./attendance-tracker-d5112-firebase-adminsdk-fbsvc-7e4c45f8d9.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

module.exports = { admin, db };