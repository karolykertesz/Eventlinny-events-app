import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import classes from "./UI/ui-modules/findimage.module.css";
import { categories } from "../data";

const FindImage = ({ item }) => {
  const findItem = categories.findIndex((it) => it === item.category);

  const imgLink = `/images/sugimages/${
    findItem < 0 ? "healthy" : item.category
  }.jpg`;
  console.log(imgLink, "jjsss");
  return (
    <div className={classes.top}>
      <div className={classes.inner}>
        <Link href={`${item.id}`}>
          <Image
            width="300px"
            height="250px"
            src={imgLink}
            alt={item.category}
            quality="100"
          />
        </Link>
        <div className={classes.bottom}>
          <p>{item.category}</p>
        </div>
      </div>
    </div>
  );
};

export default FindImage;
