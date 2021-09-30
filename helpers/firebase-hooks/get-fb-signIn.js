import firebase from "firebase";
export const fbsignin = async (email) => {
  if (!email) return;
  const mess = await fetch("/api/users/helpers/fbcookies", {
    method: "POST",
    body: JSON.stringify({
      email: email,
    }),
    headers: {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  });
  const status = await mess.status;
  if (status === 200 || status === 201) {
    const user = firebase
      .firestore()
      .collection("user_aditional")
      .where("email", "==", email)
      .get()
      .then((doc) => {
        if (doc.size > 0) {
          console.log(doc.size);
          doc.forEach((d) => {
            if (d.data().pref_events) {
              return (window.location.href = "/events/first");
            } else {
              return (window.location.href = "/startup");
            }
          });
        } else {
          return (window.location.href = "/startup");
        }
      });
  }
};
