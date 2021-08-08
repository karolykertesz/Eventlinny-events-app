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
  const [comments, setComments] = useState();
  const [loading, setLoading] = useState(false);
  const modeRef = useRef(true);
  const datafetch = useCallback(() => {
    firebase
      .firestore()
      .collection("comments")
      .doc(id)
      .onSnapshot(async (snapShot) => {
        const data = await snapShot.data();
        setComments({
          id: snapShot.id,
          data: data,
        });
      });
  }, [setComments]);
  useEffect(() => {
    datafetch();
  }, [datafetch]);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className={classes.hold}>
      {!comments ? (
        <div>
          <Nocomments docid={comments && comments.id} id={id} />
        </div>
      ) : (
        <div>
          {comments && (
            <Fragment>
              <CommentHead
                date={comments.data.added_at}
                id={comments.data.added_by}
                likes={comments.data.likes}
                commentBody={comments.data.comment_body}
                arr={comments && comments.data.replies}
                docid={comments && comments.id}
              />
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
};

export default ComentsCross;
