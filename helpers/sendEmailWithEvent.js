import firebase from "firebase";
export const sendEmailWithEvent = async (
  email,
  displayname,
  startToSend,
  selectedcategory,
  docId,
  description
) => {
  const mess = await fetch(
    "http://localhost:5301/next-events-309cd/us-central1/sendCreate",
    {
      method: "POST",
      body: JSON.stringify({
        email,
        displayname,
        startToSend,
        selectedcategory,
        docId,
        description,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  const t = await mess;
};
