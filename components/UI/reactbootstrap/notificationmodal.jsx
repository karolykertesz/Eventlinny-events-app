import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import firebase from "firebase";
import classes from "../../UI/ui-modules/notification.modal.module.css";
import { useAuth } from "../../Layout/UserContext";
const NotificationModal = (props) => {
  const user = useAuth().user;
  const { cat, id, single, setShow } = props;
  const sendAndClose = async () => {
    if (cat === "read") {
      setShow(false);
    } else {
      const dataref = await firebase
        .firestore()
        .collection("notifications")
        .doc(user && user.uid);
      await dataref
        .get()
        .then(async (doc) => {
          const data = await doc.data();
          const dataArr = await data.unread;
          const item = dataArr.find((i) => i.id === id);
          const arrayToUpdate = dataArr.filter((i) => i.id !== id);
          await dataref.update({
            read: firebase.firestore.FieldValue.arrayUnion(item),
          });
          await dataref.set(
            {
              unread: arrayToUpdate,
            },
            { merge: true }
          );
        })
        .then(() => {
          setShow(false);
        });
    }
  };
  const getcategory = () => {
    let items;
    if (cat && single) {
      if (cat === "unread") {
        items = single.unread.find((item) => item.id === id);
      } else if (cat === "read") {
        items = single.read.find((item) => item.id === id);
      }
    }
    return items;
  };
  const singleItem = getcategory();
  const noteAdded =
    singleItem &&
    new Date(singleItem.created_at).toLocaleDateString("EN-hu", {
      year: "2-digit",
      day: "2-digit",
      month: "long",
    });

  return (
    <div>
      <Modal
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered="false"
        className={classes.top}
        {...props}
      >
        <Modal.Header>
          <Modal.Title className={classes.title}>{noteAdded}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className={classes.bodyDiv}>
            {singleItem &&
              singleItem.text.map((item, indx) => <p key={indx}>{item}</p>)}
          </div>
          <button onClick={() => sendAndClose()} className={classes.closeBtn}>
            Close
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NotificationModal;
