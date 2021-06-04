export const sendEmailWithEvent = async (
  startDate,
  eventName,
  email,
  displayname
) => {
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
  console.log("hhh");
  const t = await mess;
  console.log(t);
};
