import { useState } from "react";
import EventList from "../../components/EventList";
import EventSearch from "../../components/event-search.jsx";
import { useRouter } from "next/router";
import { findDate } from "../../data";

const AllEvents = ({ eventss }) => {
  const [event, setEvent] = useState(eventss);
  const router = useRouter();
  const onSelected = (y, m) => {
    const path = `/events/${y}/${m}`;
    router.push(path);
  };
  if (!eventss) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <EventSearch onSelected={onSelected} />
      <EventList items={event} />
    </div>
  );
};

export default AllEvents;

export async function getStaticProps() {
  const response = await fetch(
    "https://next-events-309cd-default-rtdb.firebaseio.com/events.json"
  );

  const data = await response.json();
  const events = [];

  for (let key in data) {
    events.push({
      id: key,
      title: data[key].title,
      date: data[key].date,
      description: data[key].description,
      location: data[key].location,
      image: data[key].image,
      isFeatured: data[key].isFeatured,
    });
  }

  return {
    props: {
      eventss: events,
    },
    revalidate: 1800,
  };
}
