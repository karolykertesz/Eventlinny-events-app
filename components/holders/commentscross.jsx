import React, { Fragment, useState, useEffect } from "react";
import { getComments } from "../../data";
import { Nocomments } from "./indexholders";
import CommentHead from "../holders/commentsHead";
import Loader from "../UI/loader";
const ComentsCross = ({ id }) => {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const renderAll = async () => {
      const data = await getComments(id)
        .then((data) => {
          setComments(data);
        })
        .then(() => {
          setLoading(false);
        });
    };

    renderAll();
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      {comments === null ? (
        <div>
          <Nocomments />
        </div>
      ) : (
        <div>{comments && <CommentHead id={comments.added_by} />}</div>
      )}
    </div>
  );
};

export default ComentsCross;
