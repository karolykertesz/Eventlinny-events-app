export default async function handler(req, res) {
  const email = req.body.email;
  const mess = await fetch(
    "http://localhost:5001/next-events-309cd/us-central1/sendEmail",
    {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  const status = await mess.status;
  if (status === 200) {
    res.status(200).json({ m: "done" });
    return;
  } else {
    res.status(400).json({ m: "Not Done" });
    return;
  }
}
