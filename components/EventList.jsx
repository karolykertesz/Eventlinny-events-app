import EventItem from "./EventItem";
import classes from "./event-list.module.css";
const EventList = (props) => {
  const { items } = props;
  return (
    <div>
      <ul className={classes.list}>
        {items.map((item) => (
          <EventItem
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            location={item.location}
            date={item.date}
          />
        ))}
      </ul>
    </div>
  );
};

export default EventList;
