import react, { useEffect, useState } from "react";
import { useAuth } from "../../components/Layout/UserContext";
import { CoverDiv } from "../startup";
import Userpage from "../../handlers/userpage";
import { useRouter } from "next/router";
import BigLoader from "../../components/UI/BigLoader";
import { getuserimage } from "../../data";

const UserProfile = ({ userLocation, userinfo, userAdditional, imgUrl }) => {
  const router = useRouter();
  const [user, setuser] = useState();
  const unuser = async () => {
    const validate = await fetch("/api/users/validateSesion");
    if (validate.status > 350) {
      return router.push("/login");
    }
  };
  const userContext = useAuth().user;

  useEffect(() => {
    let mode = true;
    if (mode) {
      unuser();
    }
    return function () {
      mode = false;
    };
  }, []);
  useEffect(() => {
    const unsubscribe = setuser(userContext);
    return unsubscribe;
  }, [userContext]);
  if (!userLocation || !userinfo) {
    return <BigLoader />;
  }
  return (
    <CoverDiv>
      <Userpage
        user={user && user}
        location={userLocation && userLocation}
        userInfo={userinfo && userinfo}
        userAdditional={userAdditional ? userAdditional : ""}
        imgUrl={imgUrl}
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
  const aditionals = await fetch(
    "http://localhost:3000/api/users/helpers/getaditionals",
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
        destination: "http://localhost:3000/login",
        permanent: false,
      },
    };
  }
  const location = await loc.json();
  const userInfo = await userPref.json();
  const userAd = await aditionals.json();
  const imgUrl = await getuserimage(uid);

  return {
    props: {
      userinfo: userInfo.m,
      userLocation: location.m,
      userAdditional: userAd.m,
      imgUrl: imgUrl,
    },
  };
}
export default UserProfile;
