import { useState } from "react";
import EventList from "../components/EventList";
import { db } from "../helpers/firebase";
import Head from "next/head";
const Home = ({ eventss }) => {
  const [fetched, useFetched] = useState(eventss);
  return (
    <div>
      <Head>
        <title>Next Events</title>
        <meta name="description" content="Great events by Next events" />
      </Head>
      <EventList items={fetched} />
    </div>
  );
};
export default Home;

export async function getStaticProps() {
  const events = [];
  try {
    const ref = await db
      .collection("events")
      .where(" isFeatured", "==", true)
      .get()
      .then((snapshot) => {
        snapshot.forEach((item) => {
          events.push({
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
      eventss: events,
    },
    revalidate: 1800,
  };
}
