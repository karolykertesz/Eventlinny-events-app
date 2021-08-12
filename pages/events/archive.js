import React, { useEffect, useState, useCallback, Fragment } from "react";
import { user_archive } from "../../data";
import LogisticGrid from "../../components/event-detail/logistic-item-grid";
import classes from "../../components/UI/ui-modules/archive.module.css";
import { useRedirect } from "../../helpers/validatehelp";
import ArcCont from "../../components/arcivecontainer";
const MainArchive = ({ eventss }) => {
  const [eventsBy, setEventsBy] = useState();
  const filterMe = useCallback(() => {
    return new Promise((resolve, reject) => {
      const months = [];
      eventss.map((item) => {
        const fil = new Date(item.start).toLocaleDateString("en-US", {
          month: "long",
        });
        if (!months.includes(fil)) {
          months.push(fil);
        }
        resolve(months);
      });
    }).then((mon) => {
      const arrSep = mon.map((i) => ({ key: i, values: [] }));
      eventss.map((item) => {
        const fil = new Date(item.start).toLocaleDateString("en-US", {
          month: "long",
        });
        const ar = arrSep.find((i) => i.key === fil);
        if (ar) {
          ar.values = [...ar.values, item];
        }
      });
      setEventsBy(arrSep);
    });
  }, [setEventsBy]);
  useRedirect();
  useEffect(() => {
    filterMe();
  }, [filterMe]);

  return (
    <div>
      <p className={classes.pi}>2021</p>
      <div className={classes.StyledUl}>
        {eventsBy &&
          eventsBy.map((item) => (
            <div key={item.key}>
              <ArcCont item={item} />
            </div>
          ))}
      </div>
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
