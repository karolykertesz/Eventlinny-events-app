import React, {
  useState,
  useEffect,
  Fragment,
  useCallback,
  useRef,
} from "react";
import firebase from "firebase";
import Image from "next/image";
import classes from "../UI/ui-modules/topimage.module.css";
const TopImage = ({ added_by }) => {
  const modeRef = useRef(true);
  const [userdata, setdata] = useState();
  const geturl = useCallback(() => {
    return firebase
      .firestore()
      .collection("user_aditional")
      .doc(added_by)
      .get()
      .then((docs) => {
        const data = docs.data();
        return {
          name: data.name,
          url: data.image_url ? data.image_url : "/images/noimage.svg",
        };
      });
  }, [modeRef]);
  useEffect(() => {
    // if (userdata) return;
    geturl().then((items) => {
      if (modeRef.current) {
        setdata(items);
      }
    });
    return () => {
      modeRef.current = false;
    };
  }, []);
  return (
    <Fragment>
      {userdata && (
        <div className={classes.top}>
          <Image src={userdata && userdata.url} height="70px" width="70px" />
        </div>
      )}
    </Fragment>
  );
};

export default TopImage;
