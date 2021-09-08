import React, { useState, useEffect, useRef } from "react";
import classes from "../components/UI/ui-modules/archiveimages.module.css";
import Image from "next/image";
import { getAttendiesInfo } from "../data";
import SmallImageArchive from "../components/smallimagearchive";
const Archiveimages = (props) => {
  const modeRef = useRef(true);
  const [list, addList] = useState();
  const archive = props.archive;
  const userids = archive.map((item) => item.archive_image_added);
  const ids = list && list.map((i) => i.id);
  const filteredArray =
    list && list.filter(({ id }, index) => !ids.includes(id, index + 1));
  useEffect(async () => {
    const users = await getAttendiesInfo(userids);
    if (modeRef.current) {
      addList(users);
    }
    return () => {
      modeRef.current = false;
    };
  }, []);

  return (
    <div className={classes.top}>
      <div className={classes.adders}>
        <ul className={classes.flex}>
          {list &&
            filteredArray.map((l) => (
              <li key={l.id} className={classes.img}>
                <Image
                  src={l.imgUrl}
                  height="40px"
                  width="40px"
                  quality={100}
                />
              </li>
            ))}
        </ul>
      </div>
      <div className={classes.imgComp}>
        {archive.map((it, indx) => (
          <div key={indx}>
            <SmallImageArchive url={it.url} itemdate={it.image_added_at} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Archiveimages;
