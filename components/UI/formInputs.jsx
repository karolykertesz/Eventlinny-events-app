import styled from "styled-components";
import React from "react";
import Comments from "../UI/icons/comments";
import classes from "../UI/ui-modules/startitem.module.css";

export const IconCover = styled.div.attrs((props) => ({}))`
  display: block;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  color: burlywood;

  &:active {
    color: ${(props) => props.color};
  }
  @media (min-width: 800px) {
    height: 46px;
    width: 46px;
  }

  @media (max-width: 650px) {
    height: 70px;
    width: 70px;
    margin: 0 auto;
  }
`;

export const Input = styled.input.attrs((props) => ({
  type: "text",
  size: props.small ? 10 : 18,
}))`
  border: 1px solid burlywood;
  border-radius: 3px;
  padding: 6px;
  display: block;
  margin: 0 0 1em;
  &::placeholder {
    color: burlywood;
    text-transform: capitalize;
    opacity: 1;
  }
  &:focus {
    outline: none;
  }
`;
export const FileInput = styled(Input).attrs((props) => ({
  type: "file",
}))`
  color: burlywood;
`;
const Button = styled.button`
  text-decoration: none;
  cursor: pointer;
  font: inherit;
  border: 1px solid papayawhip;
  border-radius: 6px;
  color: white;
  padding: 0.5rem 1.5rem;
  text-align: center;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  width: 10px;
`;

export const SendButton = styled(Button)`
  margin-top: 15px;
  background: burlywood;
  &:hover {
    background-color: #d2d6ac;
  }
`;

export const InputHolder = styled.div`
  padding-right: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const Cdiv = styled.div`
  max-width: 300px;
  margin: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
