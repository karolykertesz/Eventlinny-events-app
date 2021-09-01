import firebase from "firebase";
import React, { useState, useEffect } from "react";

export const useToken = () => {
  const [toki, setToken] = useState();
  useEffect(() => {
    const getToken = async () => {
      const t = await fetch("/api/users/session");
      const r = await t.json();
      return setToken(r.token);
    };

    return () => {
      return getToken();
    };
  }, [toki]);
  return {
    toki,
  };
};
