import React from "react";
import Link from "next/link";
import PublicPop from "../components/UI/reactbootstrap/publicpop";
import Image from "next/image";
import classes from "../components/UI/ui-modules/publiclist.module.css";
import IconUser from "../components/UI/icons/iconusers";
import { useRouter } from "next/router";
import firebase from "firebase";
import { useAuth } from "../components/Layout/UserContext";
const PublicItem = (props) => {
  const user = useAuth().user;
  const { item } = props;
  const router = useRouter();
  const redirect = async () => {
    const dataref = await firebase
      .firestore()
      .collection("public_chat")
      .doc(item.id);
    await dataref
      .update({
        active_users: firebase.firestore.FieldValue.arrayUnion(
          user && user.uid
        ),
      })
      .then(() => router.push(`/chat/public?id=${item.id}`))
      .catch((err) => console.error(err));
  };

  return (
    <PublicPop item={item}>
      <div onClick={() => redirect()}>
        <div className={classes.inner}>
          <Image
            src={`/images/${item.category}.jpg`}
            width=" 100px"
            height="100px"
            quality={100}
          />
          <p>category:{item.category}</p>
          <p>host: {item.host}</p>
        </div>
      </div>
    </PublicPop>
  );
};
export default PublicItem;
