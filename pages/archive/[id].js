import classes from "../../components/UI/ui-modules/carousel.archive.module.css";
import ArchiveOneItem from "../../components/archiveOneItem";
import { useRedirect } from "../../helpers/validatehelp";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { useArchiveData } from "../../helpers/firebase-hooks/get-arcive-data";

const archiveItem = () => {
  const router = useRouter();
  const id = router.query.id;
  useRedirect();
  const { items } = useArchiveData(id);
  console.log(items, "ttt");
  const [URL, setUrl] = useState(null);
  const [imgDate, setImgdate] = useState();
  const firstindex =
    items && items.archive_photos
      ? items.archive_photos[0].url
      : "/images/salmon.jpg";
  const startdate =
    items &&
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
              <ArchiveOneItem
                items={items && items}
                length={items && items.length}
              />
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

                  {items && items.archive_photos && (
                    <div className={classes.slide}>
                      <span className={classes.date}>
                        {imgDate ? imgDate : startdate}
                      </span>
                      <img src={URL !== null ? URL : firstindex} />
                    </div>
                  )}
                </div>

                <div className={classes.navigation}>
                  {items &&
                    items.archive_photos &&
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
