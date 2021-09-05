import firebase from "firebase";
import FirebaseClient from "../../../helpers/firebase";
const jwt = require("jsonwebtoken");

FirebaseClient();

const createPref = async (req, res) => {
  const { location } = await req.body;
  console.log(location);
  const auth = req.cookies.auth;
  let uid;
  try {
    const r = await jwt.verify(
      auth,
      process.env.SECRET,
      async function (err, decoded) {
        if (!err && decoded) {
          uid = decoded.data;
        }
      }
    );
  } catch (err) {
    console.log(err);
    return;
  }
  const data = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${location[0]}+${location[1]}&key=bb67b50c778f473485683ec677055afe`
  );
  const message = await data.json();
  const locationString = await message.results[0].formatted;
  const countryCode = await message.results[0].components.country_code;
  const newProm = async () => {
    const dockRef = await firebase.firestore().collection("cookies").doc(uid);
    return new Promise((resolve, reject) => {
      dockRef
        .get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            res.status(200).json({ m: "Ok" });
          } else {
            dockRef.set({
              location: locationString,
              country_code: countryCode,
            });
            res.status(200).json({ m: "Ok" });
          }
        })
        .catch((err) => {
          res.status(400).json({ m: err });
        });
    });
  };
  const pr = await newProm();
  return;
};

export default createPref;
