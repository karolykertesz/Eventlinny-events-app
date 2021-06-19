import React, { useEffect, useState, useCallback, useRef } from "react";
import Mapper from "./mapper";
import firebase from "firebase";
import { allrepliesOfComments } from "../../data";
const CommentsBody = ({ arr }) => {
  const modeRef = useRef(true);
  const runref = useRef(true);
  const [comments, setComments] = useState(null);
  const [loading, Setloading] = useState(false);
  const applydata = useCallback(async () => {
    if (!modeRef.current) return;
    Setloading(true);
    return allrepliesOfComments(arr)
      .then((items) => {
        if (modeRef.current) {
          setComments(items);
        }
      })
      .then(() => {
        Setloading(false);
      });
  }, [setComments]);
  useEffect(() => {
    applydata();
    return () => {
      modeRef.current = false;
    };
  }, []);

  if (loading) {
    return <div>Loading....</div>;
  }
  return <div>{comments && <Mapper item={comments} />}</div>;
};
export default CommentsBody;
