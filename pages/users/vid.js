import styled from "styled-components";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState, Fragment } from "react";
// import sender from "../../helpers/sender";
const ValidPage = () => {
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const email = router.query && router.query.email;
  console.log(email);

  const sander = async () => {
    const mess = await fetch("/api/users/vid", {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const status = await mess.status;
    console.log(status, "the staus");
    if (status === 200) {
      setReady(true);
    }
  };
  useEffect(() => {
    const unsubscribe = sander().then((re) => {
      console.log(re);
    });
    return () => {
      unsubscribe;
    };
  }, []);

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
