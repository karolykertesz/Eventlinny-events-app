import react, { Fragment, useEffect, useState, useCallback } from "react";
import UserProfileTop from "../../components/userProfileTop";
import firebase from "firebase";
import { useAuth } from "../../components/Layout/UserContext";
import { CoverDiv } from "../startup";
import Userpage from "../../handlers/userpage";
import { useRouter } from "next/router";
import Loader from "../../components/UI/loader";
import { getUserdata } from "../../helpers/helpers";
const UserProfile = ({ userLocation, userinfo }) => {
  const router = useRouter();
  const [user, setuser] = useState();
  const unsubscribe = async () => {
    const validate = await fetch("/api/users/validateSesion");
    if (validate.status > 350) {
      return router.push("/login");
    }
  };
  const userContext = useAuth().user;

  useEffect(() => {
    unsubscribe();
  }, []);
  useEffect(() => {
    const unsubscribe = setuser(userContext);
    return unsubscribe;
  }, [userContext]);

  return (
    <CoverDiv>
      <Userpage
        user={user && user}
        location={userLocation && userLocation}
        userInfo={userinfo && userinfo}
      />
    </CoverDiv>
  );
};
export async function getstaticPaths() {
  return {
    paths: [{ params: { uid: "1" } }, { params: { uid: "2" } }],
    fallback: true,
  };
}
export async function getServerSideProps(context) {
  const uid = context.params.uid;
  const userPref = await fetch(
    "http://localhost:3000/api/users/helpers/firstPage",
    {
      method: "POST",
      body: JSON.stringify({
        uid: uid,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  const loc = await fetch(
    "http://localhost:3000/api/users/helpers/userlocation",
    {
      method: "POST",
      body: JSON.stringify({
        uid: uid,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  if (!loc || !userPref) {
    return {
      notFound: true,
      redirect: {
        destination: "http://localhost:30003/login",
        permanent: false,
      },
    };
  }
  const location = await loc.json();
  const userInfo = await userPref.json();

  return {
    props: {
      userinfo: userInfo.m,
      userLocation: location.m,
    },
  };
}
export default UserProfile;
