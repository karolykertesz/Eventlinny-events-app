import React, { useState } from "react";
import Image from "next/image";
import classes from "../components/UI/ui-modules/smallimagearchive.module.css";
import ImageModal from "../components/UI/reactbootstrap/imageModal";

const SmallImageArchive = ({ itemdate, url }) => {
  const [isShow, setIshow] = useState(false);
  const humandate = new Date(itemdate).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div className={classes.topdiv}>
      <div className={classes.img}>
        <button className={classes.btn} onClick={() => setIshow(!isShow)}>
          <Image src={url} width="100px" height="100px" quality={100} />
        </button>
        <ImageModal
          show={isShow}
          height="150px"
          width="250px"
          onHide={() => setIshow(false)}
          url={url}
          title={humandate}
        />
      </div>
      <div className={classes.date}>{humandate}</div>
    </div>
  );
};
export default SmallImageArchive;
