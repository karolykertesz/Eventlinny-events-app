import React, { useState } from "react";
import {
  ComentContainer,
  CommentHolder,
  IconDock,
} from "../UI/icons/iconcovers";
import Image from "next/image";
import { useAuth } from "../Layout/UserContext";
import { BiLike } from "react-icons/bi";
import { IconContext } from "react-icons";
import classes from "./css/comment.module.css";
import Comments from "../UI/icons/comments";
import firebase from "firebase";

const Mapper = ({ item, docid }) => {
  // const likedArr = item && item.data;
  const [liked, setLiked] = useState(false);
  const [itemId, setItemid] = useState(() => {
    return item.map((i) => i.id);
  });
  // const itemArr = item.map((i) => ({ id: i.id, like: i.data.likes.length }));
  const [likeCount, setLike] = useState(() => {
    const t = item.map((i) => ({ id: i.id, like: i.data.likes.length }));
    return t;
  });

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
  const giveOrtake = (id) => {
    setLiked(!liked);
    if (!liked) {
      setItemid(itemId.filter((i) => i !== id));
      const tr = likeCount.find((i) => i.id === id);
      const newObj = { id: id, like: tr.like >= 1 ? tr.like - 1 : 0 };
      let arr = likeCount.filter((i) => i.id !== id);
      arr = [...arr, newObj];
      setLike(arr);

      // const arrayClone =
      // setLike(likeCount[id].like - 1);

      // console.log(likeCount.id);

      // return dataref.update({
      //   replies:
      // });
    } else {
      setItemid(itemId.concat(id));
      const tr = likeCount.find((i) => i.id === id);
      const newObj = { id: id, like: tr.like + 1 };
      let arr = likeCount.filter((i) => i.id !== id);
      arr = [...arr, newObj];
      setLike(arr);
      // setLike(likeCount.id.like + 1);
      // console.log(likeCount.id);
      // console.log(id);
    }
  };

  return (
    <div>
      {item ? (
        <ul>
          {item.map((i, indx) => (
            <li key={indx}>
              <ComentContainer>
                <CommentHolder>
                  <Image
                    width="35px"
                    height="35px"
                    src={i.url}
                    className={classes.image}
                    quality={100}
                  />
                  <p className={classes.liketext}>{i.name}</p>
                  <p className={classes.liketext}>
                    {humanReadableDate(i.data.when)}
                  </p>
                  <IconContext.Provider
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
                  </IconContext.Provider>
                </CommentHolder>
                <CommentHolder>
                  <IconDock icon={Comments} />
                  <p className={classes.liketext}>{i.data.what}</p>
                  <p className={classes.liketext}>
                    likes: ({getLikeCount(i.id)})
                  </p>
                </CommentHolder>
              </ComentContainer>
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
