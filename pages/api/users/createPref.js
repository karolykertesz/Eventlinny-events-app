import firebase from "firebase";
import FirebaseClient from "../../../helpers/firebase";
import { cuser } from "../users/helpers/currentuser";
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
  const { country, town } = message.results[0].components;

  const newProm = async () => {
    const dockRef = await firebase.firestore().collection("cookies").doc(uid);
    return new Promise((resolve, reject) => {
      dockRef
        .get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            console.log("g");
          } else {
            dockRef.set({
              city: town,
              country: country,
              pref_events: intArray,
            });
          }
        })
        .catch((err) => console.log(err));
    });
  };
  const pr = await newProm();
  res.status(200).json({ m: "Ok" });
};

export default createPref;
