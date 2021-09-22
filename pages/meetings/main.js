import React, { useState } from "react";
import { useRouter } from "next/router";
import { useRedirect } from "../../helpers/validatehelp";
import { useAuth } from "../../components/Layout/UserContext";
import { useSingleEvent } from "../../helpers/firebase-hooks/get-single-event";

const Main = () => {
  useRedirect();
  const router = useRouter();
  const user = useAuth().user;

  const userName = user && user.name;
  const [error, setError] = useState();

  return <main></main>;
};
export default Main;
