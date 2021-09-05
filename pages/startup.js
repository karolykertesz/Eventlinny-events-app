import { Fragment, useEffect } from "react";
import Uilayer from "../components/UI/uiLayer ";
import StartItem from "../components/startitem";
import { useState } from "react";
import { useRouter } from "next/router";
import classes from "../components/UI/button.module.css";
import firebase from "firebase";
import styled from "styled-components";
import Head from "next/head";
import { send } from "../helpers/helpers";
import { useAuth } from "../components/Layout/UserContext";
import { useLocation } from "../helpers/firebase-hooks/getLocation";
import { useUserStart } from "../helpers/firebase-hooks/userStartUp";
import { useRedirect } from "../helpers/validatehelp";
import { categoryImages } from "../utils/image-utils";

const StartUp = () => {
  useRedirect();
  const user = useAuth().user;
  const { location } = useLocation();
  const use = useUserStart(user && user, location);
  const [userInt, setUserInt] = useState([]);
  const router = useRouter();
  const saveEvents = () => {
    return firebase
      .firestore()
      .collection("user_aditional")
      .doc(user && user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          doc.ref.update({
            pref_events: userInt,
          });
        }
      })
      .then(() => {
        router.push("/events/first");
      });
  };
  // useEffect(() => {
  //   const getmedata = async () => {
  //     const ad = await getLock().then(() => {
  //       return new Promise(async (resolve, reject) => {
  //         if (user) {
  //           const docInfo = await firebase
  //             .firestore()
  //             .collection("user_aditional")
  //             .doc(user && user.uid)
  //             .set(
  //               { email: user && user.email, name: user && user.name },
  //               { merge: true }
  //             )
  //             .then(() => console.log("k"));
  //         }
  //       }).catch((err) => console.log(err));
  //     });
  //   };
  //   return () => {
  //     return getmedata();
  //   };
  // }, []);

  const addUserInt = (id) => {
    console.log(id);
    const item = userInt.find((i) => i === id);
    if (!item) {
      return setUserInt([...userInt, id]);
    }
    const data = userInt.filter((i) => i !== id);
    setUserInt(data);
  };

  // const getLock = () => {
  //   const getLocation = async (position) => {
  //     const { latitude, longitude } = await position.coords;
  //     const loca = [];
  //     loca.push(latitude, longitude);
  //     if (location.length === 0) {
  //       return setLocation(loca);
  //     }
  //   };
  //   if (location) {
  //     return navigator.geolocation.getCurrentPosition(getLocation, console.log);
  //   } else {
  //     return;
  //   }
  // };
  console.log(userInt);
  return (
    <Fragment>
      <Head>
        <title>All next events</title>
        <meta name="description" content="all online cooking events" />
      </Head>
      <CoverDiv>
        <PageTitle>Add Your favorite Cooking Events</PageTitle>
        <Uilayer>
          {categoryImages.map((i) => (
            <span key={i.name}>
              <StartItem items={i} addUserInt={addUserInt} />
            </span>
          ))}
        </Uilayer>
        {userInt.length > 0 && (
          <ButtonComp>
            <button className={classes.btn} onClick={() => saveEvents()}>
              Save My Events
            </button>
          </ButtonComp>
        )}
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
`;
export const CoverDiv = styled.div`
  @media (max-width: 600px) {
    margin-top: 100px;
    padding: 100px;
  }
`;
export const ButtonComp = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
