import React, { Fragment, useState, useEffect } from "react";
import { getComments } from "../../data";
import { Nocomments } from "./indexholders";
const ComentsCross = ({ id }) => {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    return getComments(id).then((items) => setComments(items));
  }, []);
  return (
    <div>
      {!comments ? (
        <div>
          <Nocomments />
        </div>
      ) : (
        <div>{comments.added_by}</div>
      )}
    </div>
  );
};

export default ComentsCross;
