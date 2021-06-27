import React, { useEffect, useState } from "react";
import { user_archive } from "../../data";
import LogisticGrid from "../../components/event-detail/logistic-item-grid";
import styled from "styled-components";

const MainArchive = ({ eventss }) => {
  return (
    <FlexDiv>
      {eventss && (
        <StyledUl>
          {eventss.map((item) => (
            <Li key={item.id}>
              <LogisticGrid
                start={item.start}
                category={item.category}
                location={item.location}
                id={item.id}
                attendies={item.attendies}
                added_by={item.added_by}
              />
            </Li>
          ))}
        </StyledUl>
      )}
    </FlexDiv>
  );
};

export async function getStaticProps() {
  const allEv = await user_archive();
  if (!allEv) {
    return {
      notFound: true,
      redirect: {
        destination: "/login",
      },
    };
  }
  return {
    props: {
      eventss: allEv,
    },
    revalidate: 1800,
  };
}

export default MainArchive;

const StyledUl = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  /* gap: 100px; */
  @media (max-width: 1000px) {
    /* display: flex; */
    /* flex-direction: column; */
    grid-template-columns: 1fr;
    grid-gap: 10px;
    /* margin: 0 60px; */
  }
`;
const FlexDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const Li = styled.li`
  width: 120%;
  @media (max-width: 1000px) {
    width: 100%;
  }
`;
