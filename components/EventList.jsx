import EventItem from "./EventItem";
import classes from "./event-list.module.css";

const EventList = (props) => {
  const { items } = props;
  return (
    <div>
      <ul className={classes.list}>
        {items
          .sort((a, b) => {
            return b.start - a.start;
          })
          .map((item, indx) => (
            <EventItem
              key={indx}
              id={item.id}
              location={item.location}
              start={item.start}
              category={item.category}
              attendies={item.attendies}
              description={item.description}
              end={item.end}
              added_by={item.added_by}
            />
          ))}
      </ul>
    </div>
  );
};

export default EventList;
