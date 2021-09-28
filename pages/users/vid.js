import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect, useState, Fragment, useCallback } from "react";
import firebase from "firebase";
const ValidPage = () => {
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const email = router.query && router.query.email;

  const sander = useCallback(async () => {
    const data = {
      email: email,
    };
    const sendEm = firebase.functions().httpsCallable("sendEmail");
    await sendEm(data).then(() => {
      return new Promise((resolve, reject) => {
        resolve(setReady(true));
      }).then(() => {
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      });
    });
  }, [email]);
  useEffect(() => {
    sander();
  }, [sander]);

  return (
    <Fragment>
      {ready && <Thank>Thank You</Thank>}
      <Sign>Please Log In!</Sign>
    </Fragment>
  );
};

export default ValidPage;
// c5319c11-188f-4768-bb47-8ee6711cfda9

const Sign = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  color: burlywood;
  font-size: 24px;
`;

const Thank = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  color: burlywood;
  font-size: 24px;
`;
