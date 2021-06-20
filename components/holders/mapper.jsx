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
  const [liked, setLiked] = useState(false);
  const [itemId, setItemid] = useState(() => {
    return item.map((i) => i.id);
  });
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
    const dataref = firebase.firestore().collection("comments").doc(docid);
    setLiked(!liked);
    if (!liked) {
      setItemid(itemId.filter((i) => i !== id));
      return dataref.update({
        replies: 
      });
    } else {
      setItemid(itemId.concat(id));
    }
  };

  // console.log(item, "item");

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
                        ? classes.icontop
                        : classes.iconLike,
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
                    likes: ({i.data.likes.length})
                  </p>
                </CommentHolder>
              </ComentContainer>
            </li>
          ))}
        </ul>
      ) : (
        <div>hhh</div>
      )}
    </div>
  );
};
export default Mapper;
