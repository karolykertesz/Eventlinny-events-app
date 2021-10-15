import React, { useState } from "react";
import EventList from "../../components/EventList";
import { useRouter } from "next/router";
import { user_events_data } from "../../data";
import styled from "styled-components";
import firebase from "firebase";
import Head from "next/head";
import FirebaseClient from "../../helpers/firebase";
import { useRedirect } from "../../helpers/validatehelp";
import classes from "../../components/UI/ui-modules/first.page.module.css";
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
      <div className={classes.holder}>
        {event && (
          <div className={classes.center}>
            <EventList items={event} />
          </div>
        )}
      </div>
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
  width: 100%;
  position: absolute;
  left: 50%;
  top: 15%;
  transform: translate(-50%, 0);
  @media (max-width: 1000px) {
    display: flex;
    justify-content: center;
  }

  /* align-items: center; */
  /* justify-content: center; */
  /* margin: 100px;
  @media (max-width: 650px) {
    margin: 100px 0 0 0;
  } */
`;

const Top = styled.div`
  width: 100%;
  height: auto;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0 auto;
`;
