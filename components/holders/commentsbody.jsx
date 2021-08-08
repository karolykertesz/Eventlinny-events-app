import React, { useEffect, useState, useCallback, useRef } from "react";
import Mapper from "./mapper";
import { allrepliesOfComments } from "../../data";
const CommentsBody = ({ arr, docid }) => {
  const modeRef = useRef(true);
  const runref = useRef(true);
  const [comments, setComments] = useState(null);
  const [loading, Setloading] = useState(false);
  const applydata = useCallback(async () => {
    Setloading(true);
    return allrepliesOfComments(arr)
      .then((items) => {
        setComments(items);
      })
      .then(() => {
        Setloading(false);
      });
  }, [setComments]);
  useEffect(() => {
    applydata();
  }, [applydata]);

  if (loading) {
    return <div>Loading....</div>;
  }
  return <div>{comments && <Mapper item={comments} docid={docid} />}</div>;
};
export default CommentsBody;
