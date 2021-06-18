import React, { useEffect, useState } from "react";
import { allrepliesOfComments } from "../../data";
const CommentsBody = ({ arr }) => {
  const [comments, setComments] = useState(null);
  console.log(comments);
  useEffect(() => {
    let mode = true;
    allrepliesOfComments(arr).then((items) => {
      if (mode) {
        setComments(items);
      }
    });
    return () => {
      mode = false;
    };
  }, []);
  return <div></div>;
};
export default CommentsBody;
