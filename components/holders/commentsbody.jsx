import React, { useEffect, useState, useCallback, useRef } from "react";
import { allrepliesOfComments } from "../../data";
const CommentsBody = ({ arr }) => {
  const [comments, setComments] = useState(null);
  const modeRef = useRef(true);

  const applydata = useCallback(() => {
    return allrepliesOfComments(arr).then((items) => {
      if (modeRef.current) {
        setComments(items);
      }
    });
  }, [setComments]);

  useEffect(() => {
    applydata();
    return () => {
      modeRef.current = false;
    };
  }, [applydata]);
  return <div></div>;
};
export default CommentsBody;
