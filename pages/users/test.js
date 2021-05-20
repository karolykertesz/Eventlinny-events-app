import React, { useState, useCallback } from "react";
import FirebaseClient from "../../helpers/firebase";
import { useAuth } from "../../components/Layout/UserContext";
FirebaseClient();

import firebase from "firebase";

const Test = () => {
  const [tok, settok] = useState();
  // const { user } = useAuth();
  let id;
  //   const email = "carlo3030@hotmail.hu";
  //   const password = "123456";
  const sign = async () => {
    return firebase
      .auth()
      .signInWithEmailAndPassword("carlo3030@hotmail.hu", "123456")
      .then(async (user) => {
        const token = await user.getIdToken();
        settok(token);
        ss();
      })
      .catch((err) => console.log(err));
  };
  const ss = useCallback(() => {
    console.log(tok);
  }, [settok]);
  return (
    <div>
      <button onClick={() => sign()}>Click</button>
    </div>
  );
};

export default Test;
