import admin from "firebase-admin";
export default async function adminuser(req, res) {
  const uid = await req.body.uid;
  if (uid) {
    return admin
      .auth()
      .getUser(uid)
      .then((user) => {
        console.log(user);
        const data = user.metadata;
        res.status(200).json({ adminuser: data });
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  } else {
    res.status(400).json({ error: "No user" });
  }

  //   const uid = req.body.id;
  //   console.log(uid);
  //   const user = await AuthM(uid)
  //     .then((us) => {
  //       console.log(us);
  //     })
  //     .catch((err) => console.log(err));
  //   //   console.log(user);
  //   //   console.log(adminuser);
  //
}
