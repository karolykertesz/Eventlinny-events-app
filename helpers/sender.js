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
      return {
        message: mes.message,
        status,
      };
    } else {
      return {
        status,
      };
    }
    // }
  } catch (err) {
    console.log(err);
  }
}
