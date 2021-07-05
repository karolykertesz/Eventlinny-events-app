import React, { useState, useEffect, useRef, useCallback } from "react";
import Loader from "../../components/UI/loader";
import { useRouter } from "next/router";
import firebase from "firebase";
import {
  getUserEmail,
  getLinkAndPass,
  verifyAndSend,
  clearOut,
} from "../../helpers/wrappers/chathelpers";
const Verify = () => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isVerified, setVer] = useState(false);
  const query = router.query;
  const { l, r, to, ui } = query;
  const modeRef = useRef(true);
  const getData = useCallback(async () => {
    const { link, pass } = await getLinkAndPass(r);
    if (!link) {
      if (modeRef.current) {
        setError("Invalid Credentials");
        return;
      }
    }
    const email = await getUserEmail(ui);
    if (!email) {
      if (modeRef.current) {
        setError("Invalid Credentials");
        return;
      }
    }
    const ver = await verifyAndSend(r, to, email);
    if (!ver) {
      if (modeRef.current) {
        setError("Invalid Credentials");
        return;
      }
    }
    const data = {
      email: email,
      password: pass,
      room: r,
    };
    const sendEmail = firebase.functions().httpsCallable("sendPassword");
    await sendEmail(data)
      .then(() => {
        setError(
          "Thank You You have Been verified,You Will be rederected to login NoW"
        );
      })
      .then(async () => {
        await clearOut(r, to, email);
      })
      .then(() => {
        router.push("/login");
      });
  }, [query]);

  useEffect(() => {
    getData();
    return () => {
      modeRef.current = false;
    };
  }, [getData]);
  return <div>{error && error}</div>;
};
export default Verify;
