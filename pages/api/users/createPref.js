import firebase from "firebase";
import FirebaseClient from "../../../helpers/firebase";
const jwt = require("jsonwebtoken");

FirebaseClient();

const createPref = async (req, res) => {
  const { location, userInt } = await req.body;
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

  const locArray = location.split(",");
  const intArray = userInt.split(",");
  const data = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${locArray[0]}+${locArray[1]}&key=bb67b50c778f473485683ec677055afe`
  );
  const message = await data.json();
  const locationString = await message.results[0].formatted;

  const newProm = async () => {
    const dockRef = await firebase.firestore().collection("cookies").doc(uid);
    return new Promise((resolve, reject) => {
      dockRef
        .get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            res.status(200).json({ m: "Ok" });
            console.log("run");
          } else {
            dockRef.set({
              location: locationString,
              pref_events: intArray,
            });
            res.status(200).json({ m: "Ok" });
          }
        })
        .catch((err) => console.log(err));
    });
  };
  const pr = await newProm();
  return;
};

export default createPref;
