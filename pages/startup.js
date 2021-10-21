import { Fragment } from "react";
import Uilayer from "../components/UI/uiLayer ";
import StartItem from "../components/startitem";
import { useState } from "react";
import { useRouter } from "next/router";
import classes from "../components/UI/button.module.css";
import firebase from "firebase";
import styled from "styled-components";
import Head from "next/head";
import { useAuth } from "../components/Layout/UserContext";
import { useRedirect } from "../helpers/validatehelp";
import { categoryImages } from "../utils/image-utils";
import { useLocation } from "../helpers/firebase-hooks/getLocation";
import { useUserStart } from "../helpers/firebase-hooks/userStartUp";

const StartUp = () => {
  useRedirect();
  const user = useAuth().user;
  const { location } = useLocation();
  useUserStart(user, location);
  const [userInt, setUserInt] = useState([]);
  const router = useRouter();
  const saveEvents = () => {
    return firebase
      .firestore()
      .collection("user_aditional")
      .doc(user && user.uid)
      .set({
        pref_events: userInt,
      })
      .then(() => {
        router.push("/events/first");
      });
  };

  const addUserInt = (name) => {
    const item = userInt.find((i) => i === name);
    if (!item) {
      return setUserInt([...userInt, name]);
    }
    const data = userInt.filter((i) => i !== name);
    setUserInt(data);
  };
  // const getLock = async () => {
  //   const getLocation = async (position) => {
  //     const { latitude, longitude } = await position.coords;
  //     const loca = [];
  //     loca.push(latitude, longitude);
  //     if (location.length === 0) {
  //       await setLocation(loca);
  //     }
  //   };
  //   if (location) {
  //     await navigator.geolocation.getCurrentPosition(getLocation, console.log);
  //   } else {
  //     return;
  //   }
  // };
  return (
    <Fragment>
      <Head>
        <title>All next events</title>
        <meta name="description" content="all online cooking events" />
      </Head>
      <CoverDiv>
        <CoverTop>
          <PageTitle>Add Your favorite Cooking Events</PageTitle>
          {userInt.length > 0 && (
            <ButtonComp>
              <button className={classes.btn} onClick={() => saveEvents()}>
                Save My Events
              </button>
            </ButtonComp>
          )}
        </CoverTop>

        <Uilayer>
          {categoryImages.map((items) => (
            <span key={items.name}>
              <StartItem items={items} addUserInt={addUserInt} />
            </span>
          ))}
        </Uilayer>
      </CoverDiv>
    </Fragment>
  );
};

export default StartUp;

const PageTitle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 10px;
  color: burlywood;
  text-align: center;
  text-transform: uppercase;
  font-size: 17px;
  margin-top: 100px;
  margin-left: 80px;
  @media (max-width: 650px) {
    font-size: 14px;
    margin-left: 0;
  }
`;
export const CoverDiv = styled.div`
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  @media (max-width: 600px) {
    margin-top: 0;
    padding: 0 100px;
    margin-bottom: 60px;
  }
`;
export const ButtonComp = styled.div`
  width: auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  margin-right: 50px;
  @media (max-width: 650px) {
    margin-right: 0;
    button {
      width: 150px;
      height: 50px;
    }
  }
`;
const CoverTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
