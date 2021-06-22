import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import classes from "./UI/ui-modules/findimage.module.css";

const FindImage = ({ item }) => {
  console.log(item, "itehm");
  return (
    <div className={classes.top}>
      <div className={classes.inner}>
        <Image width="250px" height="250px" src="/" />
        <div className={classes.bottom}></div>
      </div>
    </div>
  );
};

export default FindImage;
