import React from "react";
import firebase from "firebase";
import { Toast } from "react-bootstrap";
import classes from "../../UI/ui-modules/rc-toast.module.css";
import { useRouter } from "next/router";
import { useAuth } from "../../Layout/UserContext";

const ReactTost = () => {
  const { user } = useAuth();
  const router = useRouter();
  const acceptPolicy = async () => {
    const dataRef = await firebase
      .firestore()
      .collection("user_aditional")
      .doc(user && user.uid);
    return dataRef.update({
      policy: true,
    });
  };
  return (
    <div>
      <Toast className={classes.rcTostTop}>
        <Toast.Header closeButton={false} className={classes.rcHeader}>
          <strong>
            This site uses cookies to ensure you get the best experience on our
            website.
          </strong>
        </Toast.Header>
        <Toast.Body className={classes.rcFooter}>
          <div className={classes.buttonComp}>
            <button
              className={classes.privacyBtn}
              onClick={() => router.push("/users/policy")}
            >
              View Privacy Policy
            </button>
            <button className={classes.buttonOk} onClick={() => acceptPolicy()}>
              OK
            </button>
          </div>
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default ReactTost;
