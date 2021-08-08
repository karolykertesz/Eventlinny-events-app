import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import classes from "../UI/ui-modules/eventComp.module.css";
import { getComments } from "../../data";
import firebase from "firebase";
import { Nocomments } from "./indexholders";
import CommentHead from "../holders/commentsHead";
import Loader from "../UI/loader";
import CommentsBody from "../holders/commentsbody";
const ComentsCross = ({ id }) => {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(false);
  const modeRef = useRef(true);
  const datafetch = useCallback(() => {
    firebase
      .firestore()
      .collection("user_add_events")
      .doc(id)
      .collection("comments")
      .doc("comment")
      .onSnapshot(async (snapShot) => {
        const data = await snapShot.data();
        if (data) {
          setComments({
            data: data,
          });
        }
      });
  }, [setComments]);
  console.log();
  useEffect(() => {
    datafetch();
  }, [datafetch]);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className={classes.hold}>
      <div>
        {comments !== null ? (
          <Fragment>
            <CommentHead
              date={comments && comments.data.added_at}
              id={comments && comments.data.added_by}
              likes={comments && comments.data.likes}
              commentBody={comments && comments.data.comment_body}
              arr={comments && comments.data.replies}
              docid={id}
            />
          </Fragment>
        ) : (
          <div>
            <Nocomments id={id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ComentsCross;
