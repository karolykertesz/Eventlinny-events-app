import { useEffect, useState } from "react";
import EventList from "../../components/EventList";
import EventSearch from "../../components/event-search.jsx";
import { useRouter } from "next/router";
import useSWR from "swr";

const AllEvents = ({ eventList }) => {
  const { data, error } = useSWR(
    "https://next-events-309cd-default-rtdb.firebaseio.com/events.json"
  );
  const [fetched, setFetched] = useState(eventList);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSelected = (y, m) => {
    const path = `/events/${y}/${m}`;
    router.push(path);
  };
  useEffect(() => {
    setLoading(true);
    if (data) {
      let events = [];
      for (let key in data) {
        events.push({
          id: key,
          title: data[key].title,
          description: data[key].description,
          location: data[key].location,
          image: data[key].image,
          isFeatured: data[key].isFeatured,
        });
      }
      setFetched(events);
      setLoading(false);
    }
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <EventSearch onSelected={onSelected} />
      {fetched && <EventList items={fetched} />}
    </div>
  );
};

export default AllEvents;

const getStaticProps = async () => {
  const response = await fetch(
    "https://next-events-309cd-default-rtdb.firebaseio.com/events.json"
  );
  const data = response.json();
  let eventList = [];
  if (data) {
    for (let key in data) {
      eventList.push({
        id: key,
        title: data[key].title,
        description: data[key].description,
        location: data[key].location,
        image: data[key].image,
        isFeatured: data[key].isFeatured,
      });
    }
  }
  return {
    props: {
      eventList,
    },
  };
};
