import React, { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import firebase from "firebase";
import classes from "../holders/css/commentsHead.module.css";
import AddCommentsAccordion from "../UI/reactbootstrap/accordion";
import { BiLike } from "react-icons/bi";
import { IconContext } from "react-icons";
import { useAuth } from "../Layout/UserContext";

const CommentHead = ({ id, likes, docid, commentBody }) => {
  function addNewlines(str) {
    let result = "";
    while (str.length > 0) {
      result += str.substring(0, 50) + "\n";
      str = str.substring(60);
    }
    return result;
  }
  const [userdata, setdata] = useState();
  const [liked, setLiked] = useState(false);
  const userId = useAuth().user && useAuth().user.uid;
  const modeRef = useRef(true);
  const geturl = useCallback(() => {
    return firebase
      .firestore()
      .collection("user_aditional")
      .doc(id)
      .get()
      .then((docs) => {
        if (docs.exists) {
          if (modeRef.current) {
            return {
              name: docs.data().name,
              url: docs.data().image_url
                ? docs.data().image_url
                : "/images/noimage.svg",
            };
          }
        }
      });
  }, [modeRef.current]);
  useEffect(() => {
    geturl().then((items) => {
      if (modeRef.current) {
        setdata(items);
      }
    });
    return () => {
      modeRef.current = false;
    };
  }, []);
  const functionLike = () => {
    const dataRef = firebase.firestore().collection("comments").doc(docid);
    setLiked(!liked);
    if (!liked) {
      dataRef
        .update({
          likes: firebase.firestore.FieldValue.arrayUnion(userId),
        })
        .then(() => {
          alert("done");
        });
    } else {
      dataRef
        .update({
          likes: firebase.firestore.FieldValue.arrayRemove(userId),
        })
        .then(() => {
          alert("Done");
        });
    }
  };
  return (
    <div>
      {userdata && (
        <div>
          <div className={classes.top}>
            <IconContext.Provider
              value={{ className: !liked ? classes.icontop : classes.iconLike }}
            >
              <button
                className={classes.iconButton}
                onClick={() => functionLike()}
              >
                <BiLike />
              </button>
            </IconContext.Provider>
            <span className={classes.liketext}>likes :{likes.length}</span>
            <p>added by {userdata.name}</p>
            <Image
              width="60px"
              height="60px"
              src={userdata.url}
              quality={100}
            />
            {/* <div className={classes.cov}>
            <p>Add comment</p>
            <span className={classes.icon}>
              <Plus />
            </span>
          </div> */}
          </div>
          <div className={classes.body}>
            <p style={{ textAlign: "center" }}>{userdata.name} said:</p>
            <p>{addNewlines(commentBody && commentBody)}</p>
          </div>
          <AddCommentsAccordion docId={docid} isCom={true} />
        </div>
      )}
    </div>
  );
};
export default CommentHead;
