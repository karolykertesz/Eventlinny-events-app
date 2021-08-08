import React, { useState } from "react";
import Image from "next/image";
import { useAuth } from "../Layout/UserContext";

import classes from "../UI/ui-modules/comment.inbox.module.css";

const Mapper = ({ item, docid }) => {
  const [liked, setLiked] = useState(false);
  const [itemId, setItemid] = useState(() => {
    return item.map((i) => i.id);
  });
  const [likeCount, setLike] = useState(() => {
    const t = item.map((i) => ({ id: i.id, like: i.data.likes.length }));
    return t;
  });
  function addNewlines(str) {
    let result = "";
    while (str.length > 0) {
      result += str.substring(0, 50) + "\n";
      str = str.substring(60);
    }
    return result;
  }

  const getLikeCount = (itemId) => {
    const one = likeCount.filter((i) => i.id === itemId);
    const count = one[0].like;
    return count;
  };
  const userId = useAuth().user.uid;
  const humanReadableDate = (item) => {
    const t = item.toDate().toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return t;
  };
  // const giveOrtake = (id) => {
  //   setLiked(!liked);
  //   if (!liked) {
  //     setItemid(itemId.filter((i) => i !== id));
  //     const tr = likeCount.find((i) => i.id === id);
  //     const newObj = { id: id, like: tr.like >= 1 ? tr.like - 1 : 0 };
  //     let arr = likeCount.filter((i) => i.id !== id);
  //     arr = [...arr, newObj];
  //     setLike(arr);
  //   } else {
  //     setItemid(itemId.concat(id));
  //     const tr = likeCount.find((i) => i.id === id);
  //     const newObj = { id: id, like: tr.like + 1 };
  //     let arr = likeCount.filter((i) => i.id !== id);
  //     arr = [...arr, newObj];
  //     setLike(arr);
  //     // setLike(likeCount.id.like + 1);
  //     // console.log(likeCount.id);
  //     // console.log(id);
  //   }
  // };

  return (
    <div>
      {item ? (
        <ul>
          {item.map((i, indx) => (
            <li key={indx} className={classes.added}>
              <div className={classes.addedImg}>
                <Image
                  width="35px"
                  height="35px"
                  src={i.url}
                  className={classes.image}
                  quality={100}
                />
              </div>
              <div className={classes.addComms}>
                <div className={classes.commInbox}>
                  <div className={classes.holder}>
                    <span>{addNewlines(i.data.what)}</span>
                    <span>{i.name}</span>
                  </div>
                  <span className={classes.time}>
                    {humanReadableDate(i.data.when)}
                  </span>
                </div>
              </div>

              {/* <IconContext.Provider
                value={{
                  className: itemId.includes(i.id)
                    ? classes.iconLike
                    : classes.icontop,
                }}
              >
                <button
                  className={classes.button}
                  onClick={() => giveOrtake(i.id)}
                >
                  <BiLike />
                </button>
              </IconContext.Provider> */}

              {/* <p className={classes.liketext}>likes: ({getLikeCount(i.id)})</p> */}
            </li>
          ))}
        </ul>
      ) : (
        <div>hhhhhhhhh</div>
      )}
    </div>
  );
};
export default Mapper;
