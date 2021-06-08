import styled from "styled-components";
import React from "react";

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
  width: 300px;
`;

export const SendButton = styled(Button)`
  background: burlywood;
  &:hover {
    background: #d2d6ac;
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
`;