import React from "react";
import Link from "next/link";
import PublicPop from "../components/UI/reactbootstrap/publicpop";
import Image from "next/image";
import classes from "../components/UI/ui-modules/publiclist.module.css";

const PublicItem = (props) => {
  const { item } = props;
  return (
    <PublicPop host={item.host} category={item.category} id={item.id}>
      <div className={classes.top}>
        <div className={classes.inner}>
          <Image
            src={`/images/${item.category}.jpg`}
            width=" 100px"
            height="100px"
          />
          <p>
            category:{item.category}/ {item.host}
          </p>
        </div>
      </div>
    </PublicPop>
  );
};
export default PublicItem;
