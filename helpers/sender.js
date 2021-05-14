const jwt = require("jsonwebtoken");

export default async function sender(tok, email, password, router) {
  try {
    const mess = await fetch("/api/users/session", {
      method: "POST",
      body: JSON.stringify({
        token: tok,
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const status = await mess.status;
    const mes = await mess.json();
    console.log(mes);
    if (status !== 200) {
      return mes;
    } else {
      return (window.location.href = `${mes.message}`);
    }
    // }
  } catch (err) {
    console.log(err);
  }
}
