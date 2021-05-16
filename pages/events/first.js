import react, { useEffect, useState, useCallback } from "react";
import firebase from "firebase";
import FirebaseClient from "../../helpers/firebase";
import { useAuth } from "../../components/Layout/UserContext";
const First = () => {
  const [userId, setUserId] = useState("");
  const [data, setData] = useState();
  FirebaseClient();
  const call = useCallback(
    async (uid) => {
      const mess = await fetch("/api/users/helpers/firstPage", {
        method: "POST",
        body: JSON.stringify({
          uid: uid,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const d = await mess.json();
      setData(d);
    },
    [setData]
  );

  useEffect(() => {
    const { user } = useAuth();
    if (user) {
      const uid = user.uid;
      call(uid);
    }
  }, [call]);
  console.log(data);
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
