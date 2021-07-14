import React from "react";
import Link from "next/link";
import PublicPop from "../components/UI/reactbootstrap/publicpop";
import Image from "next/image";
import classes from "../components/UI/ui-modules/publiclist.module.css";
import IconUser from "../components/UI/icons/iconusers";
const PublicItem = (props) => {
  const { item } = props;

  return (
    <PublicPop item={item}>
      <div>
        <div className={classes.inner}>
          <Image
            src={`/images/${item.category}.jpg`}
            width=" 100px"
            height="100px"
            quality={100}
          />
          <p>category:{item.category}</p>
          <p>host: {item.host}</p>
          {/* <div className={classes.iconHolder}>
            <IconUser color="peru" width="20px" />
            <p>{item.active_users.length}</p>
          </div> */}
        </div>
      </div>
    </PublicPop>
  );
};
export default PublicItem;
