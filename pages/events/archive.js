import React, { useEffect, useState } from "react";
import { user_archive } from "../../data";
import LogisticGrid from "../../components/event-detail/logistic-item-grid";
import classes from "../../components/UI/ui-modules/archive.module.css";
import { useRedirect } from "../../helpers/validatehelp";
const MainArchive = ({ eventss }) => {
  useRedirect();
  return (
    <div>
      {eventss && (
        <ul className={classes.StyledUl}>
          {eventss.map((item) => (
            <li className={classes.li} key={item.id}>
              <LogisticGrid
                start={item.start}
                category={item.category}
                location={item.location}
                id={item.id}
                attendies={item.attendies}
                added_by={item.added_by}
                isArchive={item.isArchive}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
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
