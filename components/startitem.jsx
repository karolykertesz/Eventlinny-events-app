import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import classes from "./UI/ui-modules/startitem.module.css";

const StartItem = ({ items, addUserInt }) => {
  const [selected, setSelected] = useState(false);
  const item = items && items;
  return (
    <div style={{ width: "100%" }}>
      <Divlayer>
        <p className={classes.title}>{item}</p>
        <span
          className={selected ? classes.divlayer : classes.divImage}
          onClick={() => setSelected(!selected)}
        >
          <Image
            src={`/images/${item}.jpg`}
            alt={item.name}
            width={350}
            height={250}
            quality={100}
          />
        </span>
        <span>
          <Pi onClick={() => addUserInt(item)}>
            <Paragraph>{items.name}</Paragraph>
            <SVG onClick={() => setSelected(!selected)}>
              {!selected ? (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              ) : (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              )}
            </SVG>
          </Pi>
        </span>
      </Divlayer>
    </div>
  );
};

const Divlayer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  /* width: 100%; */
`;
export const Pi = styled.div`
  text-align: center;
  text-transform: capitalize;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
`;
const Paragraph = styled.p`
  font-size: 1.2rem;
  font-family: Arial, Helvetica, sans-serif;
  text-transform: capitalize;
  color: burlywood;
  font-weight: 500;
`;
export const SVG = styled.span`
  width: 30px;
  height: 30px;
  color: #b35900;
  margin-left: 15px;
  &:active {
    color: burlywood;
  }
`;

export default StartItem;
