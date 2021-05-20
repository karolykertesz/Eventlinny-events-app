const jwt = require("jsonwebtoken");

export default async function sender(tok, user) {
  try {
    const mess = await fetch("/api/users/session", {
      method: "POST",
      body: JSON.stringify({
        token: tok,
        user: user,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const status = await mess.status;
    const mes = await mess.json();
    // console.log(status);
    // console.log(mes);
    if (status !== 200) {
      return mes;
    } else {
      const user = await mes.userObj;
      await fetch("/api/users/helpers/currentuser", {
        method: "POST",
        body: JSON.stringify({
          user: user,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return (window.location.href = `${mes.message}`);
    }
    // }
  } catch (err) {
    console.log(err);
  }
}
