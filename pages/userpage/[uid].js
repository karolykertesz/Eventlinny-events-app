import react from "react";
import { useAuth } from "../../components/Layout/UserContext";
import { CoverDiv } from "../startup";
import Userpage from "../../handlers/userpage";
import { useRouter } from "next/router";
import BigLoader from "../../components/UI/BigLoader";
import { getuserimage } from "../../data";
import { useRedirect } from "../../helpers/validatehelp";
import { useCategories } from "../../helpers/firebase-hooks/pref-catecories";
const UserProfile = ({ userLocation, userAdditional, imgUrl }) => {
  useRedirect();
  const router = useRouter();
  const user = useAuth().user;
  const uid = user && user.uid;
  const { pref } = useCategories(uid);
  if (!userLocation || !pref) {
    return <BigLoader />;
  }
  return (
    <CoverDiv>
      <Userpage
        user={user && user}
        location={userLocation && userLocation}
        userInfo={pref}
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
  const loc = await fetch(
    "https://eventlinny.vercel.app/api/users/helpers/userlocation",
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
    "https://eventlinny.vercel.app/api/users/helpers/getaditionals",
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

  if (!loc) {
    return {
      notFound: true,
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const location = await loc.json();
  const userAd = await aditionals.json();
  const imgUrl = await getuserimage(uid);

  return {
    props: {
      userLocation: location.m,
      userAdditional: userAd.m,
      imgUrl: imgUrl,
    },
  };
}
export default UserProfile;
