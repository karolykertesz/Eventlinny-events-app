export const sendEmailWithEvent = async (
  startDate,
  eventName,
  email,
  displayname
) => {
  const mess = await fetch("/api/users/helpers/sendEventInvit", {
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
  });
  const t = await mess;
  consolelog(t);
};
