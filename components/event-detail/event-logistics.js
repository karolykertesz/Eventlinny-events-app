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

function EventLogistics(props) {
  const { date, address, image, imageAlt, start, addedby, attendies, id } =
    props;
  const [signedUp, setSignedUp] = useState();
  const [showmodal, setShowModal] = useState(false);
  const userId = useAuth().user && useAuth().user.uid;
  const abst = new Date(date).getTime();
  const humanReadableDate = new Date(abst).toLocaleDateString("en-US", {
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
  useEffect(() => {
    const checkisSigned = () => {
      const isThere = attendies.find((i) => i === userId);
      if (isThere) {
        setSignedUp(true);
      } else {
        setSignedUp(false);
      }
    };
    return checkisSigned();
  }, []);
  if (!userId || !address) {
    return <Loader />;
  }
  const senRem = () => {};
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
          <address>{attendies.length}</address>
        </LogisticsItem>

        {!signedUp && (
          <span onClick={() => signUp()}>
            <LogisticsItem icon={Plus}>
              <address>Sign Up</address>
            </LogisticsItem>
          </span>
        )}
      </ul>
      <span>
        <Reactmodal
          show={showmodal}
          onHide={() => setShowModal(false)}
          callBack={() => {}}
        />
        <button onClick={() => setShowModal(!showmodal)}>jjjjhhhhhjj</button>
      </span>
    </section>
  );
}

export default EventLogistics;
