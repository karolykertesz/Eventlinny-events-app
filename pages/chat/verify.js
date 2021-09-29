import React, { useState, useEffect, useRef, useCallback } from "react";
import BigLoader from "../../components/UI/BigLoader";
import { useRouter } from "next/router";
import firebase from "firebase";
import {
  getUserEmail,
  getLinkAndPass,
  verifyAndSend,
  clearOut,
  writteNoti,
} from "../../helpers/wrappers/chathelpers";
const Verify = () => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isVerified, setVer] = useState(false);
  const [loading, setLoading] = useState(false);
  const query = router.query;
  const { l, r, to, ui } = query;
  const modeRef = useRef(true);
  const getData = useCallback(async () => {
    setLoading(true);
    const { link, pass } = await getLinkAndPass(r);
    if (!link) {
      setError("Link Verification is Wrong");
      setLoading(false);

      return;
    }
    const email = await getUserEmail(ui);
    if (!email) {
      setError("Wrong Email");
      setLoading(false);
      return;
    }
    const ver = await verifyAndSend(r, to, email);
    if (!ver) {
      setError("Invalid verification");
      setLoading(false);

      return;
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
      .then(async () => {
        await writteNoti(ui, pass, r);
      })
      .then(() => {
        setLoading(false);
        router.push("/login");
      });
  }, [query]);

  useEffect(() => {
    getData();
    return () => {
      modeRef.current = false;
    };
  }, [getData]);
  if (loading) {
    return <BigLoader />;
  }
  return (
    <div
      style={{
        marginTop: "200px",
        textAlign: "center",
        fontFamily: "monospace",
        fontSize: "20px",
        color: "burlywood",
        fontWeight: "600",
        lineHeight: "2.9rem",
      }}
    >
      {error && error}
    </div>
  );
};
export default Verify;
