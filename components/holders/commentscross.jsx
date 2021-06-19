import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { getComments } from "../../data";
import { Nocomments } from "./indexholders";
import CommentHead from "../holders/commentsHead";
import Loader from "../UI/loader";
import CommentsBody from "../holders/commentsbody";
const ComentsCross = ({ id }) => {
  const [comments, setComments] = useState();
  const [loading, setLoading] = useState(false);
  const modeRef = useRef(true);
  const datafetch = useCallback(() => {
    return getComments(id).then((items) => {
      if (modeRef.current) {
        setComments(items);
      }
    });
  }, [setComments]);
  useEffect(() => {
    datafetch();
    return () => {
      modeRef.current = false;
    };
  }, [datafetch]);
  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {!comments ? (
        <div>
          <Nocomments />
        </div>
      ) : (
        <div>
          {comments && (
            <Fragment>
              <CommentHead
                id={comments.added_by}
                likes={comments.likes}
                docid={comments.id}
              />
              <CommentsBody arr={comments.replies} />
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
};

export default ComentsCross;
