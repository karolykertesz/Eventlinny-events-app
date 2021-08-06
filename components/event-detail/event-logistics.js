import React, { useEffect, useState } from "react";
import firebase from "firebase";
import AddressIcon from "../UI/icons/address-icon";
import DateIcon from "../UI/icons/date-icon";
import LogisticsItem from "../event-detail/logistics-item";
import PersonIcon from "../UI/icons/person-icon";
import Plus from "../UI/icons/plus";
import classes from "../event-detail/event-logistics.module.css";
import Image from "next/image";
import { useAuth } from "../Layout/UserContext";
import Loader from "../../components/UI/loader";
import Reactmodal from "../UI/reactbootstrap/modal";
import sendcal from "../../helpers/sendcal";

function EventLogistics(props) {
  const {
    address,
    image,
    start,
    end,
    attendies,
    id,
    description,
    location,
    imageAlt,
    addedby,
  } = props;

  const [signedUp, setSignedUp] = useState();
  const [showmodal, setShowModal] = useState(false);
  const [userImage, setuserImage] = useState();
  const userId = useAuth().user && useAuth().user.uid;
  const email = useAuth().user && useAuth().user.email;
  const abst = new Date().getTime();
  const userName = useAuth().user && useAuth().name;

  const humanReadableDate = new Date(start).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const humanStartTime = new Date(start).toLocaleTimeString();
  const addressText = address;
  const signUp = () => {
    return firebase
      .firestore()
      .collection("user_add_events")
      .doc(id)
      .update({
        attendies: firebase.firestore.FieldValue.arrayUnion(userId),
      })
      .then(() => setSignedUp(true))
      .then(() => setShowModal(true));
  };

  if (!userId || !address) {
    return <Loader />;
  }
  const senRem = () => {
    return new Promise((resolve, reject) => {
      resolve(setShowModal(false));
    })
      .then(() => {
        sendcal(email, start, description, location);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image
          src={`/${image}`}
          alt={imageAlt}
          width={300}
          height={300}
          quality={100}
          layout="responsive"
        />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{humanReadableDate}</time>
          <time style={{ marginLeft: "10px" }}>{humanStartTime}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
        <LogisticsItem icon={PersonIcon}>
          <address className={classes.divided}>{attendies.length}</address>
        </LogisticsItem>
      </ul>
      <span>
        <Reactmodal
          show={showmodal}
          onHide={() => setShowModal(false)}
          add={() => senRem()}
          text={"Would you Like to have a remainder?"}
        />
      </span>
    </section>
  );
}

export default EventLogistics;
