import React, { useEffect, useState } from "react";
import AddressIcon from "../UI/icons/address-icon";
import DateIcon from "../UI/icons/date-icon";
import LogisticsItem from "../event-detail/logistics-item";
import classes from "../event-detail/event-logistics.module.css";
import Image from "next/image";
import { useAuth } from "../Layout/UserContext";
import Loader from "../../components/UI/loader";
import firebase from "firebase";

function EventLogistics(props) {
  const { date, address, image, imageAlt, start, addedby } = props;
  const user = useAuth().user;
  const [adminuser, setAdmin] = useState();
  const abst = new Date(date).getTime();
  const humanReadableDate = new Date(abst).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const humanStartTime = new Date(start).toLocaleTimeString();
  const addressText = address;

  if (!user || !address) {
    return <Loader />;
  }

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
      </ul>
    </section>
  );
}

export default EventLogistics;
