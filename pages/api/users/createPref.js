import firebase from "firebase";
import FirebaseClient from "../../../helpers/firebase";
const cookie = require("cookie");

FirebaseClient();
const createPref = async (req, res) => {
  const { location, userInt, uid } = await req.body;
  const locArray = location.split(",");

  const intArray = userInt.split(",");
  const data = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${locArray[0]}+${locArray[1]}&key=bb67b50c778f473485683ec677055afe`
  );
  const message = await data.json();
  const formated = await message.results[0].formatted.split(",");
  const city = await formated[0];
  const country = await formated[formated.length - 1];

  const dockRef = await firebase.firestore().collection("cookies").doc(uid);
  await dockRef
    .get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        console.log("e");
      } else {
        dockRef.set({
          city: city,
          country: country,
          pref_events: intArray,
        });
      }
    })
    .catch((err) => console.log(err));
  res.status(200).json({ m: "Ok" });
};

export default createPref;
