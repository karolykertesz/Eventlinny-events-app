import styled from "styled-components";

const Uilayer = (props) => {
  return <Layer>{props.children}</Layer>;
};

export default Uilayer;
export const Layer = styled.div`
  background: papayawhip;
  height: 100%;
  width: 100%;
  display: grid;
  gap: 1rem;
  text-align: center;
  overflow-y: auto;
  overflow-x: hidden;

  @media screen and (min-width: 680px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (min-width: 780px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media screen and (max-width: 680px) {
    gap: 0;
  }
`;
