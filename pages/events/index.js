import { useState, useEffect } from "react";
import EventList from "../../components/EventList";
import EventSearch from "../../components/event-search.jsx";
import { useRouter } from "next/router";
import { getAllEvents } from "../../data";
import firebase from "firebase";
import Head from "next/head";
import FirebaseClient from "../../helpers/firebase";
FirebaseClient();

const db = firebase.firestore();

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
    <>
      <Head>
        <title>All next events</title>
        <meta
          name="description"
          content="all next events including non featured events"
        />
      </Head>
      <EventSearch onSelected={onSelected} />
      {event && <EventList items={event} />}
    </>
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
