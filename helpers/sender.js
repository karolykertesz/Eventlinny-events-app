const jwt = require("jsonwebtoken");

export default async function sender(tok, uid) {
  try {
    const mess = await fetch("/api/users/session", {
      method: "POST",
      body: JSON.stringify({
        token: tok,
        uid: uid,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const status = await mess.status;
    const mes = await mess.json();
    if (status !== 200) {
      console.log(mes);
      return mes;
    } else {
      window.location.href = `${mes.message}`;
    }
    // }
  } catch (err) {
    console.log(err);
  }
}
