import { getAllEvents } from "../../data";
import EventList from "../../components/EventList";
import EventSearch from "../../components/event-search.jsx";
import { useRouter } from "next/router";
const AllEvents = () => {
  const allE = getAllEvents();
  const router = useRouter();
  const onSelected = (y, m) => {
    const path = `/events/${y}/${m}`;
    router.push(path);
  };
  return (
    <div>
      <EventSearch onSelected={onSelected} />
      <EventList items={allE} />
    </div>
  );
};

export default AllEvents;
