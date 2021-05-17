import firebase from "firebase";
import FirebaseClient from "../helpers/firebase";
FirebaseClient();

export const send = async (location, userInt) => {
  if (!location || !userInt) {
    return;
  }
  const loc = location.join(",");
  const mess = await fetch("/api/users/createPref", {
    method: "POST",
    body: JSON.stringify({
      location: loc,
      userInt: userInt,
    }),

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const status = await mess.status;
  if (status === 200) {
    return (window.location.href = "/events/first");
  }
};
