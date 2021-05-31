import react, { useState, useCallback, useEffect } from "react";
import classes from "./event-item.module.css";
import Button from "./UI/Button";
import DateIcon from "./UI/icons/date-icon";
import AddresIcon from "./UI/icons/address-icon";
import ArrowIcon from "./UI/icons/arrow-right-icon";
import Image from "next/image";

const EventItem = (props) => {
  const { start, end, category, location, id } = props;
  const [isValid, setValid] = useState(() => {
    return start > new Date().getTime();
  });
  const addressV = location;

  const linkTo = `/events/${id}`;
  console.log(isValid);
  console.log(new Date().getTime(), "new date");
  console.log(start, "start");
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
            <h2>{category}</h2>
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
          <div className={classes.actions}>
            <Button link={linkTo} isdisabled={isValid}>
              <span>Go to Event</span>
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
