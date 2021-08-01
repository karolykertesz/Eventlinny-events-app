import React, { useState } from "react";
import { Card, Popover, OverlayTrigger } from "react-bootstrap";
import classes from "../components/UI/ui-modules/imagePop.module.css";
import Photo from "../components/UI/icons/photo";
import firebase from "firebase";
import { useAuth } from "./Layout/UserContext";
import Tinyspinner from "../components/UI/tinyspinner";
const ImagePop = ({ uid }) => {
  const user = useAuth().user && useAuth().user;
  const fileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    const fileUrl = await fileRef.getDownloadURL();
    setLoading(true);
    return firebase
      .firestore()
      .collection("user_add_events")
      .doc(uid)
      .update({
        archive_photos: firebase.firestore.FieldValue.arrayUnion({
          url: fileUrl,
          image_added_at: Date.now(),
          archive_image_added: user && user.uid,
        }),
      })
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  };
  const [loading, setLoading] = useState(false);
  const popover = (
    <Popover id="popover-basic" className={classes.top}>
      <Popover.Title as="h3" className={classes.title}>
        Add and View Your Images In Archive
      </Popover.Title>
      <Popover.Content>
        <Card>
          <Card.Body>
            <p className={classes.text}>Upload</p>
            <input type="file" onChange={fileChange} />
          </Card.Body>
          <Card.Footer></Card.Footer>
        </Card>
      </Popover.Content>
    </Popover>
  );

  if (loading) {
    return <Tinyspinner />;
  }
  return (
    <div>
      <OverlayTrigger trigger="click" placement="left" overlay={popover}>
        <button className={classes.btn}>
          <Photo width="25px" color="burlywood" />
        </button>
      </OverlayTrigger>
    </div>
  );
};

export default ImagePop;
