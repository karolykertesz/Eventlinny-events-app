import React from "react";
import Singleinput from "./singleInput";
import Datepicker from "./datepicker";
import Languagepicker from "./languagepicker";

const SingleSelect = ({ item, uid }) => {
  if (item === "name" || item === "email" || item === "bio") {
    return <Singleinput item={item} />;
  }
  if (item === "birthday") {
    return (
      <div>
        <Datepicker uid={uid && uid} />
      </div>
    );
  }
  if (item === "language") {
    return (
      <div>
        <Languagepicker uid={uid} />
      </div>
    );
  }
  return <div></div>;
};

export default SingleSelect;
