import react, { useEffect, useState, useCallback } from "react";
import firebase from "firebase";
import FirebaseClient from "../../helpers/firebase";

const First = () => {
  const [userId, setUserId] = useState("");
  const [data, setData] = useState();
  FirebaseClient();

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      const uid = user.uid;
      setUserId(uid);
    }
    call(userId);
  }, []);
  console.log(data);
  console.log(userId);
  const call = useCallback(
    async (userId) => {
      const mess = await fetch("/api/users/helpers/firstPage", {
        method: "POST",
        body: JSON.stringify({
          uid: userId,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const d = await mess.json();
      return () => setData(d);
    },
    [setUserId]
  );
  return (
    <div>
      <button onClick={() => call()}>Click</button>
      {/* <div>{uid && uid}</div> */}
    </div>
  );
};
export default First;
// export async function getStaticProps() {
//   FirebaseClient();
//   const authPromise = () => {
//     return new Promise((resolve, reject) => {
//       const user = firebase.auth().currentUser;
//       console.log(user.email);
//     });
//   };

//   setTimeout(authPromise, 2000);
//   return {
//     props: {
//       uid: "n",
//     },
//     revalidate: 1800,
//   };
// }
