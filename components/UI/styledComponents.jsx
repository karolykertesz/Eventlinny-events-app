import react from "react";
import styled from "styled-components";
import classes from "../../components/event-item.module.css";

export const Pi = styled.p`
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  color: burlywood;
  font-weight: 500;
  margin-left: 2px;
  padding-left: 2px;
  text-transform: capitalize;
`;

export const PiBig = styled.p`
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 24px;
  color: burlywood;
  font-weight: 500;
  margin-left: 2px;
  padding-left: 2px;
  text-transform: capitalize;
`;

export const List = ({ children }) => {
  return <div className={classes.list}>{children}</div>;
};

export const Cover = styled.div`
  display: flex;
  justify-content: center;
  max-width: 700px;
  align-items: center !important;
  margin: 10px auto;
  flex-direction: column;
`;

export const CoverRow = styled.div`
  display: flex;

  justify-content: center;
  max-width: 600px;
  align-items: flex-start;
  margin: 10px auto;
  flex-direction: row;
`;
export const CatContainer = (props) => {
  return <CoverRow>{props.children}</CoverRow>;
};

export const EventTop = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-image: linear-gradient(
    to right bottom,
    #dfd7d7,
    rgba(230, 224, 213, 0.8)
  );
  border-bottom: 1px solid rgba(230, 224, 213, 0.8);
  width: 500px;
  height: 7rem;
`;

export const TopContainer = (props) => {
  return <EventTop>{props.children}</EventTop>;
};

export const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #df2f2f;
  font-size: 18px;
  font-family: Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  text-align: center;
`;

export const Grid = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr;

  @media (max-width: 650px) {
    /* display: flex; */
    /* flex-direction: column; */
    position: absolute;
    left: 50%;
    top: 75%;
    transform: translate(-50%, -50%);
  }
`;
