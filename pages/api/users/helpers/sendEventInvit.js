const cors = require("cors")({ origin: true });

export default async function hander(req, res) {
  cors(req, res, async () => {
    const { startDate, eventName, email, displayname } = req.body;
    try {
      const mess = await fetch(
        "http://localhost:5301/next-events-309cd/us-central1/sendCreate",
        {
          method: "POST",
          body: JSON.stringify({
            startDate,
            eventName,
            email,
            displayname,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const status = await mess.status;
      console.log(status);
      if (status < 350) {
        res.status(200).json({ m: "email sent" });
      } else {
        res.status(500).json({ m: "error" });
      }
    } catch (err) {
      throw new Error(err);
    }
  });
}
