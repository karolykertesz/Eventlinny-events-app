import react, { Fragment, useEffect, useState, useCallback } from "react";
import UserProfileTop from "../../components/userProfileTop";
import { useRouter } from "next/router";
import firebase from "firebase";
const UserProfile = () => {
  const router = useRouter();
  const querry = router.query.uid;
  const [userInct, setUser] = useState();
  const addUser = useCallback(
    (user) => {
      return setUser(user);
    },
    [setUser]
  );

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user && querry) {
        addUser({
          userId: user.uid,
          name: user.displayName,
          email: user.email,
        });
      }
    });
  }, [addUser]);
  return (
    <>
      {userInct && (
        <UserProfileTop querry={querry && querry} user={userInct && userInct} />
      )}
    </>
  );
};

export default UserProfile;
