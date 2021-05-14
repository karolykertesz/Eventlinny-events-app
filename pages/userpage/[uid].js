import react, { Fragment } from "react";
import UserProfileTop from "../../components/userProfileTop";
import { useRouter } from "next/router";
import firebase from "firebase";
const UserProfile = () => {
  const router = useRouter();
  const querry = router.query.uid;
  return <Fragment>{<UserProfileTop querry={querry && querry} />}</Fragment>;
};

export default UserProfile;
