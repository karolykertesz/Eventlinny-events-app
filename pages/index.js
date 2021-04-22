import { useState, useEffect } from "react";
import EventList from "../components/EventList";
import useSWR from "swr";

const Home = ({ eventss }) => {
  const [fetched, useFetched] = useState(eventss);
  const { data, error } = useSWR(
    'https://next-events-309cd-default-rtdb.firebaseio.com/events.json?orderBy="isFeatured"&equalTo=true'
  );
  useEffect(() => {
    if (data) {
      const event = [];
      for (let key in data) {
        event.push({
          id: key,
          title: data[key].title,
          description: data[key].description,
          location: data[key].location,
          image: data[key].image,
          isFeatured: data[key].isFeatured,
        });
      }
      useFetched(event);
    }
  }, []);

  return (
    <div>
      <EventList items={fetched} />
    </div>
  );
};
export default Home;

export async function getStaticProps() {
  const response = await fetch(
    'https://next-events-309cd-default-rtdb.firebaseio.com/events.json?orderBy="isFeatured"&equalTo=true'
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
  };
}
