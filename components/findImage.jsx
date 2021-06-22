import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import classes from "./UI/ui-modules/findimage.module.css";
import { categories } from "../data";
import Videocamera from "./UI/icons/videocamera";
import AddressIcon from "./UI/icons/address";

const FindImage = ({ item }) => {
  const findItem = categories.findIndex((it) => it === item.category);
  console.log(item.location);
  const imgLink = `/images/sugimages/${
    findItem < 0 ? "healthy" : item.category
  }.jpg`;
  console.log(imgLink, "jjsss");
  return (
    <div className={classes.top}>
      <div className={classes.inner}>
        <div className={classes.imgInner}>
          <div className={classes.imgCon}>
            {item.location === "online" ? (
              <Videocamera color="burlywood" width="40px" />
            ) : (
              <AddressIcon color="burlywood" width="40px" />
            )}
          </div>
          <Link href={`${item.id}`}>
            <Image
              width="300px"
              height="250px"
              src={imgLink}
              alt={item.category}
              quality="100"
            />
          </Link>
          {/* <div className={classes.imgInner}></div> */}
        </div>

        <div className={classes.bottom}>
          <p>{item.category}</p>
        </div>
      </div>
    </div>
  );
};

export default FindImage;
