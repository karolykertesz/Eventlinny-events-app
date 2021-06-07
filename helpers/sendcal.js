const sendcal = async (email, start, description, location) => {
  const mess = await fetch("/api/users/googlecalendar", {
    method: "POST",
    body: JSON.stringify({
      email,
      start,
      description,
      location,
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const status = await mess.status;
  const message = await mess.json();
  if (status === 200) {
    // console.log(message);
    return message;
  } else {
    return "ERROR";
  }
};

export default sendcal;
