import react, { useState } from "react";
import classes from "./event-item.module.css";
import Button from "./UI/Button";
import DateIcon from "./UI/icons/date-icon";
import AddresIcon from "./UI/icons/address-icon";
import PersonIcon from "./UI/icons/person-icon";
import ArrowIcon from "./UI/icons/arrow-right-icon";
import Image from "next/image";

const EventItem = (props) => {
  const { start, end, category, location, id, attendies } = props;
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
          src={`/images/${category}.jpg`}
          alt={category}
          width={260}
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
          </div>

          <div className={classes.date}>
            <DateIcon />
            <time> starts {new Date(start).toLocaleDateString()}</time>
            <time> at {new Date(start).toLocaleTimeString()}</time>
          </div>
          <div className={classes.date}>
            <DateIcon />
            <time>Ends {new Date(end).toLocaleDateString()}</time>
            <time>at {new Date(end).toLocaleTimeString()}</time>
          </div>
          <div className={classes.address}>
            <AddresIcon />
            <address>{addressV}</address>
          </div>
          <div className={classes.address}>
            <PersonIcon />
            <address style={{ textAlign: "center", marginBottom: "1px" }}>
              {attEndiesLength}
            </address>
          </div>
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
