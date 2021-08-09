import React, { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import firebase from "firebase";
import classes from "../UI/ui-modules/comment.sec.module.css";
import { BiLike } from "react-icons/bi";
import { IconContext } from "react-icons";
import { useAuth } from "../Layout/UserContext";
import Info from "../UI/icons/info";
import CommentsBody from "../holders/commentsbody";
import { BiPaperPlane } from "react-icons/bi";
import Tinyspinner from "../UI/tinyspinner";

const CommentHead = ({ id, docid, date, arr, likes }) => {
  const [com, setCom] = useState();
  const smartDate = new Date(date.seconds * 1000).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const [userdata, setdata] = useState();
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const userId = useAuth().user.uid;
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
    const dataRef = firebase
      .firestore()
      .collection("user_add_events")
      .doc(docid)
      .collection("comments")
      .doc("comment");
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
  const addComment = () => {
    if (!com) return;
    setLoading(true);
    const reDoc = firebase
      .firestore()
      .collection("user_add_events")
      .doc(docid)
      .collection("comments")
      .doc("comment");
    const date = new Date();
    return reDoc
      .update({
        replies: firebase.firestore.FieldValue.arrayUnion({
          what: com,
          when: date,
          who: userId && userId,
        }),
      })
      .then(() => setCom(""))
      .then(() => setLoading(false));
  };
  return (
    <div className={classes.container}>
      <div className={classes.msgHeader}>
        <div className={classes.headerImg}>
          <Image
            width="60px"
            height="60px"
            src={(userdata && userdata.url) || "/images/noimage.svg"}
            quality={100}
          />
        </div>
        <div className={classes.active}>
          <h4>{userdata && userdata.name}</h4>
          <h6 style={{ padding: "3px" }}>likes: ({likes && likes.length})</h6>
          <h6>{smartDate}</h6>
        </div>
        <div className={classes.headerIcons}>
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
          <Info width="25px" color="#fff" />
        </div>
      </div>
      <div className={classes.commentsPage}>
        <div className={classes.inbox}>
          <div className={classes.comments}>
            <div className={classes.commerInner}>
              {loading ? (
                <div>
                  <Tinyspinner width="200px" height="200px" />
                </div>
              ) : (
                <CommentsBody arr={arr && arr} docid={docid} />
              )}
            </div>
          </div>
        </div>
        <div className={classes.commentBottom}>
          <div className="input-group">
            <input
              type="text"
              className={classes.input + " " + "form-control"}
              placeholder="Comments...."
              value={com || ""}
              onChange={(e) => setCom(e.target.value)}
            />
            <div className="input-group-append">
              <span
                className={classes.group + " " + "input-group-text"}
                onClick={() => addComment()}
              >
                <IconContext.Provider value={{ className: classes.iconPlane }}>
                  <BiPaperPlane />
                </IconContext.Provider>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="bg-dark w-100">
    //   {userdata && (
    //     // <div className={classes.flex}>
    //       {/* <div className={classes.top}>
    //         <IconContext.Provider
    //           value={{ className: !liked ? classes.icontop : classes.iconLike }}
    //         >
    //           <button
    //             className={classes.iconButton}
    //             onClick={() => functionLike()}
    //           >
    //             <BiLike />
    //           </button>
    //         </IconContext.Provider>
    //         <span className={classes.liketext}>likes :{likes.length}</span>
    //         <p>added by {userdata.name}</p>
    //         <Image
    //           width="60px"
    //           height="60px"
    //           src={userdata.url}
    //           quality={100}
    //         /> */}
    //       {/* <div className={classes.cov}>
    //         <p>Add comment</p>
    //         <span className={classes.icon}>
    //           <Plus />
    //         </span>
    //       </div> */}
    //       {/* </div> */}
    //       {/* <div className={classes.body}>
    //         <p style={{ textAlign: "center" }}>{userdata.name} said:</p>
    //         {<p>{addNewlines(commentBody && commentBody)}</p>}
    //       </div> */}
    //       {/* <AddCommentsAccordion docId={docid} isCom={true} /> */}
    //     </div>
    //   // )}
    // </div>
  );
};
export default CommentHead;
