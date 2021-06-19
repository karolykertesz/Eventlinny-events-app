import React, { useState } from "react";
import Image from "next/image";
import {
  IconDock,
  ComentContainer,
  CommentHolder,
} from "../UI/icons/iconcovers";
import Comments from "../UI/icons/comments";
// import { useAuth } from "../Layout/UserContext";
import { BiLike } from "react-icons/bi";
import { IconContext } from "react-icons";
import classes from "./css/comment.module.css";
const Comment = ({ item }) => {
  const [liked, setLiked] = useState(false);
  //   const userId = useAuth().user.uid;
  const humanReadableDate = new Date(item.data.when).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
  return (
    <ComentContainer>
      <CommentHolder>
        {/* <Image width="60px" height="60px" src={item.url} /> */}
        {/* <p>{item.name}</p> */}
      </CommentHolder>
      <CommentHolder>
        <IconDock icon={Comments} />
        {/* <p className={classes.liketext}>{item.data.what}</p> */}
        {/* <p className={classes.liketext}>{humanReadableDate}</p> */}
        {/* <p className={classes.liketext}>likes: ({item.data.likes.length})</p> */}
        <IconContext.Provider
        //   value={{ className: !liked ? classes.icontop : classes.iconLike }}
        >
          <button className={classes.button} onClick={() => {}}>
            <BiLike />
          </button>
        </IconContext.Provider>
      </CommentHolder>
    </ComentContainer>
  );
};
