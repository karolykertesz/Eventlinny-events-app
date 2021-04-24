import { useState, useEffect } from "react";
import EventList from "../../components/EventList";
import EventSearch from "../../components/event-search.jsx";
import { useRouter } from "next/router";
import { getAllEvents } from "../../data";
import { db } from "../../helpers/firebase";

const AllEvents = ({ eventss }) => {
  const [event, setEvent] = useState(eventss);
  useEffect(() => {
    if (eventss) {
      getAllEvents().then((re) => {
        setEvent(re);
      });
    }
  }, []);
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
      {event && <EventList items={event} />}
    </div>
  );
};

export default AllEvents;

export async function getStaticProps() {
  const allEv = [];
  try {
    const col = await db
      .collection("events")
      .orderBy("year", "desc")
      .limit(2)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((item) => {
          allEv.push({
            id: item.id,
            ...item.data(),
          });
        });
      });
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      eventss: allEv,
    },
    revalidate: 1800,
  };
}
