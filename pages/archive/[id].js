import { findById, getUserAddIds } from "../../data";
import classes from "../../components/UI/ui-modules/carousel.archive.module.css";
import ArchiveOneItem from "../../components/archiveOneItem";
import { useRedirect } from "../../helpers/validatehelp";
import Archiveimages from "../../components/achiveImages";
import Head from "next/head";
import React, { Fragment, useEffect, useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Glide from "@glidejs/glide";

// Optional Theme Stylesheet

const archiveItem = ({ items }) => {
  let isClass = "s";
  useRedirect();
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
                    className={classes.first}
                    type="radio"
                    name="r"
                    id="r1"
                    checked="true"
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

                  <div className={classes.holder}>
                    {items.archive_photos &&
                      items.archive_photos.map((img, indx) => (
                        <div key={img.url} className={classes.slide}>
                          <img src={img.url} alt="image slider images" />
                        </div>
                      ))}
                  </div>
                </div>
                <div className={classes.navigation}>
                  <label htmlFor="r1" className={classes.bar} id="gg"></label>
                  <label htmlFor="r2" className={classes.bar}></label>
                  <label htmlFor="r3" className={classes.bar}></label>
                  <label htmlFor="r4" className={classes.bar}></label>
                  <label htmlFor="r5" className={classes.bar}></label>
                </div>
              </div>
              {/* // <Archiveimages archive={items.archive_photos} /> */}
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
  let userArray;
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
