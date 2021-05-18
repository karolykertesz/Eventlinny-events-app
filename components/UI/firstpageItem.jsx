import React from "react";
import styled from "styled-components";
import classes from "./ui-modules/firstpageItem.module.css";
import image from "next/image";

const firstPageItem = ({ userName, cusineName, image }) => {
  return (
    <div className={classes.coverdiv}>
      <NameDiv>Dear {userName} Your event selection</NameDiv>
      <Image
        src={"/" + image}
        alt={cusineName}
        width={300}
        height={200}
        quality={100}
      />
    </div>
  );
};

export default firstPageItem;

const NameDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  text-transform: uppercase;
  font-family: Arial, Helvetica, sans-serif;
`;
