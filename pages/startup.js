import { Fragment, useEffect } from "react";
import Uilayer from "../components/UI/uiLayer ";
import StartItem from "../components/startitem";
import { useState } from "react";
import { useRouter } from "next/router";
import classes from "../components/UI/button.module.css";
import { getAllAStartUp } from "../data";
import styled from "styled-components";
import Head from "next/head";
import { send } from "../helpers/helpers";
import { useAuth } from "../components/Layout/UserContext";
import firebase from "firebase";
const StartUp = ({ allStart }) => {
  const user = useAuth().user;
  useEffect(() => {
    const getmedata = async () => {
      const ad = await getLock().then(() => {
        return new Promise(async (resolve, reject) => {
          if (user) {
            const docInfo = await firebase
              .firestore()
              .collection("user_aditional")
              .doc(user && user.uid)
              .set(
                { email: user && user.email, name: user && user.name },
                { merge: true }
              )
              .then(() => console.log("k"));
          }
        }).catch((err) => console.log(err));
      });
    };
    return () => {
      return getmedata();
    };
  }, []);
  const [userInt, setUserInt] = useState([]);
  const router = useRouter();
  const [location, setLocation] = useState([]);
  const addUserInt = (id) => {
    const item = userInt.find((i) => i === id);
    if (!item) {
      return setUserInt([...userInt, id]);
    }
    const data = userInt.filter((i) => i !== id);
    setUserInt(data);
  };

  const getLock = async () => {
    const getLocation = async (position) => {
      const { latitude, longitude } = await position.coords;
      const loca = [];
      loca.push(latitude, longitude);
      if (location.length === 0) {
        await setLocation(loca);
      }
    };
    if (location) {
      await navigator.geolocation.getCurrentPosition(getLocation, console.log);
    } else {
      return;
    }
  };
  return (
    <Fragment>
      <Head>
        <title>All next events</title>
        <meta name="description" content="all online cooking events" />
      </Head>
      <CoverDiv>
        <PageTitle>Add Your favorite Cooking Events</PageTitle>
        <Uilayer>
          {allStart.map((i) => (
            <span key={i.id}>
              <StartItem items={i} addUserInt={addUserInt} />
            </span>
          ))}
        </Uilayer>
        {userInt.length > 0 && (
          <ButtonComp>
            <button
              className={classes.btn}
              onClick={() => send(location, userInt.join(","))}
            >
              Save My Events
            </button>
          </ButtonComp>
        )}
      </CoverDiv>
    </Fragment>
  );
};

export default StartUp;

export async function getStaticProps(context) {
  const data = await getAllAStartUp();
  return {
    props: {
      allStart: data,
    },
    revalidate: 1800,
  };
}

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
