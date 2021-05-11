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
    if (status !== 200) {
      const mes = mess.json();
      return mes;
    } else {
      router.push("/startup");
      return;
    }
    // }
  } catch (err) {
    console.log(err);
  }
}
