import React, { useEffect, useCallback } from "react";
import { useRouter } from "next/router";
export const useIsUserIn = () => {
  const router = useRouter();
  const checkUser = useCallback(async () => {
    const mess = await fetch("/api/users/validateSesion");
    const status = await mess.status;
    if (status === 200) {
      router.push("/events/first");
    }
  }, []);
  useEffect(() => {
    checkUser();
  }, [checkUser]);
};
