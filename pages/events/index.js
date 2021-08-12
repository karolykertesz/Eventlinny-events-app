import React, { useState, useEffect } from "react";
import EventList from "../../components/EventList";
import EventSearch from "../../components/event-search.jsx";
import { useRouter } from "next/router";
import { getAllEvents, user_events_data } from "../../data";
import styled from "styled-components";
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
        <Cover>
          <EventList items={event} />
          <div></div>
          <div></div>
        </Cover>
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

const Cover = styled.div`
  margin: 100px;
  @media (max-width: 650px) {
    margin: 100px 0 0 0;
  }
`;
