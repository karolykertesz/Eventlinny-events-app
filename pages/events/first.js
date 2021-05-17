import react, { useEffect, useState, useCallback } from "react";
import firebase from "firebase";
import FirebaseClient from "../../helpers/firebase";
const First = () => {
  const [data, setData] = useState();

  FirebaseClient();
  const call = useCallback(async () => {
    const mess = await fetch("/api/users/helpers/firstPage");
    const d = await mess.json();
    setData(d);
  }, [setData]);

  useEffect(() => {
    call();
  }, [call]);
  console.log(data);
  return <div>{data ? <div>data</div> : <div>Loadding...</div>}</div>;
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
