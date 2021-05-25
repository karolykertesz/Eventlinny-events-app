import React from "react";
import Singleinput from "./singleInput";
import Datepicker from "./datepicker";

const SingleSelect = ({ item }) => {
  if (item === "name" || item === "email" || item === "bio") {
    return <Singleinput item={item} />;
  }
  return (
    <div>
      <Datepicker />
    </div>
  );
};

export default SingleSelect;
