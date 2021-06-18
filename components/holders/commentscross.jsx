import React, { Fragment, useState, useEffect } from "react";
import { getComments } from "../../data";
import { Nocomments } from "./indexholders";
import CommentHead from "../holders/commentsHead";
import Loader from "../UI/loader";
import CommentsBody from "../holders/commentsbody";
const ComentsCross = ({ id }) => {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let mode = true;
    getComments(id).then((items) => {
      if (mode) {
        setComments(items);
      }
    });

    return () => {
      mode = false;
    };
  }, []);

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
              <CommentHead id={comments.added_by} />
              <CommentsBody arr={comments.replies} />
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
};

export default ComentsCross;
