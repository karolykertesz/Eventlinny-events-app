import classes from "./event-item.module.css";
import Button from "./UI/Button";
import DateIcon from "./UI/icons/date-icon";
import AddresIcon from "./UI/icons/address-icon";
import ArrowIcon from "./UI/icons/arrow-right-icon";

const EventItem = (props) => {
  const { title, image, date, location, id } = props;
  const visibleDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const addressV = location.replace(", ", "\n");
  const linkTo = `/events/${id}`;
  return (
    <li className={classes.item}>
      <img src={"/" + image} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
        </div>

        <div className={classes.date}>
          <DateIcon />
          <time>{visibleDate}</time>
        </div>
        <div className={classes.address}>
          <AddresIcon />
          <address>{addressV}</address>
        </div>
        <div className={classes.actions}>
          <Button link={linkTo}>
            <span>Go to Event</span>
            <span className={classes.icon}>
              <ArrowIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
