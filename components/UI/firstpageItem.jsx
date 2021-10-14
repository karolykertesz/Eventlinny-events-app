import React from "react";
import styled from "styled-components";
import classes from "./ui-modules/firstpageItem.module.css";
import Image from "next/image";

const firstPageItem = ({ userName, cusineName, image, location }) => {
  return (
    <div className={classes.coverdiv}>
      <Image
        src={"/" + image}
        alt={cusineName}
        width={300}
        height={200}
        quality={100}
      />
      <span className={classes.descpspan}>
        <Pi className={classes.description}>{cusineName}</Pi>
      </span>
    </div>
  );
};

export default firstPageItem;

export const NameDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  margin: 10px;
`;

export const Pi = styled.p`
  text-align: center;
  text-transform: uppercase;
  font-family: Poetsen One, sans-serif;
  color: #c49e7d;
  font-size: 18px;
`;
