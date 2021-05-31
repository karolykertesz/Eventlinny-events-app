import { useState, useEffect } from "react";
import EventList from "../../components/EventList";
import EventSearch from "../../components/event-search.jsx";
import { useRouter } from "next/router";
import { getAllEvents, user_events_data } from "../../data";
import firebase from "firebase";
import Head from "next/head";
import FirebaseClient from "../../helpers/firebase";
FirebaseClient();
const db = firebase.firestore();

const AllEvents = ({ eventss }) => {
  const [event, setEvent] = useState(eventss);
  console.log(eventss);

  // useEffect(() => {
  //   if (eventss) {
  //     getAllEvents().then((re) => {
  //       setEvent(re);
  //     });
  //   }
  // }, []);
  const router = useRouter();
  const onSelected = (y, m) => {
    const path = `/events/${y}/${m}`;
    router.push(path);
  };
  // if (!eventss) {
  //   return <p>Loading...</p>;
  // }

  return (
    <>
      <Head>
        <title>All next events</title>
        <meta
          name="description"
          content="all next events including non featured events"
        />
      </Head>
      {/* <EventSearch onSelected={onSelected} /> */}
      {event && <EventList items={event} />}
    </>
  );
};

export default AllEvents;

export async function getStaticProps() {
  const allEv = await user_events_data();
  console.log(allEv);
  if (!allEv) {
    return {
      notFound: true,
      redirect: {
        destination: "/login",
      },
    };
  }
  return {
    props: {
      eventss: allEv,
    },
    revalidate: 1800,
  };
}
