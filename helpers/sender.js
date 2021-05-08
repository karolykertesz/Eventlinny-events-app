export default async function sender(email, password, router, fn) {
  try {
    const mess = await fetch("/api/users/loger", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const status = await mess.status;
    const data = await mess.json();
    if (status === 200) {
      //   router.push("/first");
      console.log(data);
    } else {
      console.log(data);
    }
  } catch (err) {
    console.log(err);
  }
}
