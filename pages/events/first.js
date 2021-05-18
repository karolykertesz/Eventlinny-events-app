import react, { useEffect, useState, useCallback } from "react";
import firebase from "firebase";
import FirebaseClient from "../../helpers/firebase";
import gettoken from "../../helpers/gettoken";
import { Layer } from "../../components/UI/uiLayer ";
const First = () => {
  const [data, setData] = useState();
  const [user, setuser] = useState();

  FirebaseClient();
  const call = useCallback(async () => {
    const mess = await fetch("/api/users/helpers/firstPage");
    const d = await mess.json();
    setData(d);
  }, [setData]);
  useEffect(() => {
    const getTo = async () => {
      const user = await gettoken();
      setuser(user);
    };
    getTo();
  }, []);
  useEffect(() => {
    call();
  }, [call]);
  console.log(data);
  return !data ? <div>Loading...</div> : <Layer>data</Layer>;
};
export default First;
