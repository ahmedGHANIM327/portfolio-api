const admin = require('firebase-admin');

const serviceAccount = require('../filestorage.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET_URL
});

const storage = admin.storage();
const bucket = storage.bucket();

module.exports = bucket;
