import React, { useEffect } from "react";
import { useRouter } from "next/router";
export const useRedirect = () => {
  const router = useRouter();
  const validate = async () => {
    try {
      const mess = await fetch("/api/users/validateSesion");
      const status = await mess.status;
      if (mess.status === 400) {
        router.push("/login");
      }
    } catch (err) {
      throw new Error(err);
    }
  };
  useEffect(() => {
    validate();
  }, []);
};
