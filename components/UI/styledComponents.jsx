import react from "react";
import styled from "styled-components";
import classes from "/components/event-item.module.css";

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
