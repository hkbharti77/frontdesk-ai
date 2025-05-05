const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('../firebox-99575-firebase-adminsdk-fbsvc-41311fe88f.json');

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
module.exports = { db };
