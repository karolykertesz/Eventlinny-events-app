import { findById, getUserAddIds } from "../../data";
import classes from "../../components/UI/ui-modules/carousel.archive.module.css";
import ArchiveOneItem from "../../components/archiveOneItem";
import { useRedirect } from "../../helpers/validatehelp";
import React, { Fragment, useState } from "react";

const archiveItem = ({ items }) => {
  console.log(items);
  useRedirect();
  const [URL, setUrl] = useState(null);
  const [imgDate, setImgdate] = useState();
  const firstindex = items.archive_photos
    ? items.archive_photos[0].url
    : "/images/salmon.jpg";
  const startdate =
    items.archive_photos.length === 1 &&
    new Date(items.archive_photos[0].image_added_at).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        year: "numeric",
        month: "long",
      }
    );
  const setImgUrl = (url, date) => {
    setUrl(url);
    if (date) {
      const smartDate = new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        year: "numeric",
        month: "long",
      });
      return setImgdate(smartDate);
    }
  };
  return (
    <Fragment>
      <div className={classes.coverGrid}>
        {items && (
          <>
            <div className={classes.first}>
              <ArchiveOneItem items={items} length={items && items.length} />
            </div>
            <div className={classes.first}>
              <div className={classes.slidshow + " " + classes.middle}>
                <div className={classes.slides}>
                  <input
                    className={classes.fir}
                    type="radio"
                    name="r"
                    id="r1"
                    onChange={() => {}}
                  />
                  <input
                    type="radio"
                    name="r"
                    id="r2"
                    className={classes.sec}
                  />
                  <input
                    type="radio"
                    name="r"
                    id="r3"
                    className={classes.third}
                  />
                  <input
                    type="radio"
                    name="r"
                    id="r4"
                    className={classes.forth}
                  />
                  <input
                    type="radio"
                    name="r"
                    id="r5"
                    className={classes.first}
                  />

                  {items.archive_photos && (
                    <div className={classes.slide}>
                      <span className={classes.date}>
                        {imgDate ? imgDate : startdate}
                      </span>
                      <img src={URL !== null ? URL : firstindex} />
                    </div>
                  )}
                </div>

                <div className={classes.navigation}>
                  {items.archive_photos &&
                    items.archive_photos.map((leb) => (
                      <span
                        key={leb.url}
                        className={startdate ? classes.visHid : ""}
                      >
                        <label
                          htmlFor="r2"
                          className={classes.bar}
                          onClick={() => setImgUrl(leb.url, leb.image_added_at)}
                        ></label>
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Fragment>
  );
};

export default archiveItem;

export async function getStaticPaths() {
  const userIds = await getUserAddIds();
  const paths = userIds.map((item) => ({
    params: {
      id: item,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const id = params.id;
  const allEv = await findById(id);
  if (!allEv) {
    return {
      notFound: true,
      redirect: {
        destination: "/events/first",
      },
    };
  }
  return {
    props: {
      items: allEv,
    },
  };
}
