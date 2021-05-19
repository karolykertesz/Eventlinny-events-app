import react, { useEffect, useState, useCallback } from "react";
import FirebaseClient from "../../helpers/firebase";
import gettoken from "../../helpers/gettoken";
import { Layer } from "../../components/UI/uiLayer ";
import FirstPageItem from "../../components/UI/firstpageItem";
import { NameDiv, Pi } from "../../components/UI/firstpageItem";
import Loader from "../../components/UI/loader";
const First = () => {
  FirebaseClient();
  const [data, setData] = useState();
  const [user, setuser] = useState();
  const t = data;

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
  return !data || !user ? (
    <Loader />
  ) : (
    <div>
      {user && (
        <NameDiv>
          <Pi>
            Dear {user.userIn.name} Your selection of cooking events below
          </Pi>
        </NameDiv>
      )}
      <Layer>
        {t.m &&
          t.m.map((item, indx) => (
            <span key={indx}>
              <FirstPageItem image={item.image} cusineName={item.description} />
            </span>
          ))}
      </Layer>
    </div>
  );
};
export default First;
