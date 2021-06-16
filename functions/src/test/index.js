const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
exports.sendTest = functions
  .region("europe-west1")
  .https.onCall((data, context) => {
    cors(req, res, () => {
      const name = data.name;
      res.send({ name: `${name}` });
    });
  });
