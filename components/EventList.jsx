import EventItem from "./EventItem";
import classes from "./event-list.module.css";
const EventList = (props) => {
  const { items } = props;
  return (
    <div>
      <ul className={classes.list}>
        {items.map((item, indx) => (
          <EventItem
            key={indx}
            id={item.id}
            image={`/images/${item.category}.jpg`}
            location={item.location}
            start={item.start}
            category={item.category}
            end={item.end}
          />
        ))}
      </ul>
    </div>
  );
};

export default EventList;
