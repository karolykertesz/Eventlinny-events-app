import { Fragment } from "react";
import Uilayer from "../components/UI/uiLayer ";
import StartItem from "../components/startitem";
import { useState } from "react";
import { useRouter } from "next/router";
import classes from "../components/UI/button.module.css";
import { getAllAStartUp } from "../data";
import styled from "styled-components";
import Head from "next/head";
import tokenCheck from "../handlers/token";
import DropDown from "../components/dropdown";

const StartUp = ({ allStart }) => {
  const [userInt, setUserInt] = useState([]);
  const router = useRouter();
  const addUserInt = (id) => {
    const item = userInt.find((i) => i === id);
    if (!item) {
      return setUserInt([...userInt, id]);
    }
    const data = userInt.filter((i) => i !== id);
    setUserInt(data);
  };

  return (
    <Fragment>
      <Head>
        <title>All next events</title>
        <meta name="description" content="all online cooking events" />
      </Head>
      <CoverDiv>
        {/* <DropDown /> */}
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
            <button className={classes.btn}>Save My Events</button>
          </ButtonComp>
        )}
      </CoverDiv>
    </Fragment>
  );
};

export default StartUp;

export async function getStaticProps() {
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
  text-transform: uppercase;
`;
export const CoverDiv = styled.div`
  @media (max-width: 600px) {
    margin-top: 100px;
    padding: 100px;
  }
`;
const ButtonComp = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
