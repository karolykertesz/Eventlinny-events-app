import React, { useState, useEffect } from "react";
import EventList from "../../components/EventList";
import EventSearch from "../../components/event-search.jsx";
import { useRouter } from "next/router";
import { getAllEvents, user_events_data } from "../../data";
import firebase from "firebase";
import Head from "next/head";
import FirebaseClient from "../../helpers/firebase";
import { useRedirect } from "../../helpers/validatehelp";
FirebaseClient();
const db = firebase.firestore();

const AllEvents = ({ eventss }) => {
  useRedirect();
  const [event, setEvent] = useState(eventss);

  const router = useRouter();
  const onSelected = (y, m) => {
    const path = `/events/${y}/${m}`;
    router.push(path);
  };

  return (
    <>
      <Head>
        <title>All next events</title>
        <meta
          name="description"
          content="all next events including non featured events"
        />
      </Head>

      {event && (
        <div style={{ marginTop: "100px" }}>
          <EventList items={event} />
          <div>kkkkkk</div>
          <div></div>
        </div>
      )}
    </>
  );
};

export default AllEvents;

export async function getStaticProps() {
  const allEv = await user_events_data();
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
