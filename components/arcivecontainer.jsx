import React, { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import classes from "../components/UI/ui-modules/achivecontainer.module.css";
import { categories } from "../data";
import Globe from "../components/UI/icons/globe";
import { useRouter } from "next/router";
const filteredCat = categories.filter((item) => item !== "create");
const randomImage = () => {
  const randomNum = Math.floor(Math.random() * filteredCat.length);
  return filteredCat[randomNum];
};
const ArcCont = (props) => {
  const router = useRouter();
  const { item } = props;
  const [totImages, setimages] = useState();
  const [cat, setcat] = useState();
  const dataArray = cat && cat;
  const str = dataArray && dataArray.toString();
  const totalCount = useCallback(async () => {
    const totalcategories = [];
    const imglength = await item.values.flatMap((it) =>
      it.isArchive ? [it.totalArchImages] : []
    );
    await item.values.flatMap((it) =>
      !totalcategories.includes(it.category)
        ? totalcategories.push(it.category)
        : []
    );

    setcat(totalcategories);
    setimages(imglength);
  }, [setcat, setimages]);
  useEffect(() => {
    totalCount();
  }, [totalCount]);
  return (
    <div className={classes.card}>
      <input type="checkbox" id={item.key} className={classes.checker} />
      <div className={classes.cardheader}>
        <div className={classes.month}>{item.key}</div>
        <Image
          src={`/images/${randomImage()}.jpg`}
          width="350px"
          height="250px"
          quality={100}
        />
      </div>
      <div className={classes.inner}>
        <div className={classes.cover}></div>
        <div className={classes.menu}></div>
        <div className={classes.name}>
          <span className={classes.last}>
            Total Images: {totImages && totImages[0]}
          </span>
          <span className={classes.last}>
            Number of categories: {dataArray && dataArray.length}
          </span>
          <span className={classes.last}>Month: {item.key}</span>
          <span
            className={classes.globe}
            onClick={() => router.push(`/archive/months?m=${item.key}`)}
          >
            <p>View this months events:</p>
            <div className={classes.gb}>
              <Globe width="30px" />
            </div>
          </span>
        </div>
      </div>
      <div className={classes.hamCont}>
        <label htmlFor={item.key} className={classes.ham}>
          <div className={classes.line}></div>
          <div className={classes.line}></div>
        </label>
      </div>
    </div>
  );
};

export default ArcCont;
