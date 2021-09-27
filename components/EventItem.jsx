import React, { useState } from "react";
import classes from "../components/event-item.module.css";
import Button from "./UI/Button";
import DateIcon from "./UI/icons/date-icon";
import AddresIcon from "./UI/icons/address-icon";
import PersonIcon from "./UI/icons/person-icon";
import ArrowIcon from "./UI/icons/arrow-right-icon";
import NotApply from "./UI/icons/not-apply";
import Image from "next/image";
import ImagePop from "./imagePop";

import { categories } from "../data";
import { useAuth } from "./Layout/UserContext";
const EventItem = (props) => {
  const { start, category, location, id, attendies, added_by } = props;
  const user = useAuth().user;
  const uid = user && user.uid;
  const isImageurl = categories.includes(category);

  const [isValid, setValid] = useState(() => {
    return start > new Date().getTime();
  });
  const addressV = location;
  const attEndiesLength = attendies.length > 0 ? attendies.length : 0;
  const linkTo = `/events/${id}`;
  return (
    <span className={!isValid ? classes.falseItem : ""}>
      <span className={classes.item}>
        <Image
          src={isImageurl ? `/images/${category}.jpg` : "/images/salmon.jpg"}
          alt={category}
          width={200}
          height={180}
          quality={100}
        />
        <div className={classes.content}>
          <div className={classes.summary}>
            <h2
              style={{
                textTransform: "uppercase",
                color: "burlywood",
                fontFamily: "Ariel",
              }}
            >
              {category}
            </h2>
            {!isValid && (
              <div>
                {attendies.indexOf((item) => item === uid) > -1 ? (
                  <div>
                    <ImagePop />
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            )}
          </div>

          <div className={classes.date}>
            <DateIcon />
            <time> starts: {new Date(start).toLocaleDateString()}</time>
          </div>
          <div className={classes.address}>
            <AddresIcon />
            <address className={classes.t}>{addressV}</address>
          </div>
          <div className={classes.address}>
            <PersonIcon />
            <address style={{ textAlign: "center" }} className={classes.t}>
              {attEndiesLength}
            </address>
          </div>
          {!isValid && (
            <div className={classes.address}>
              <NotApply />
              <address style={{ textAlign: "center", marginBottom: "1px" }}>
                Finished Event
              </address>
            </div>
          )}
          <div className={classes.actions}>
            <Button link={linkTo} isdisabled={isValid}>
              Go to Event
              <span className={classes.icon}>
                <ArrowIcon />
              </span>
            </Button>
          </div>
        </div>
      </span>
    </span>
  );
};

export default EventItem;
