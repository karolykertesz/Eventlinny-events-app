import classes from "../ui-modules/styled.module.css";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import Image from "next/image";
export const IconDock = (props) => {
  const { icon: Icon } = props;
  return (
    <div className={classes.icontop}>
      <Icon />
    </div>
  );
};

export const ComentContainer = ({ children }) => {
  return <div className={classes.comentCont}>{children}</div>;
};

export const CommentHolder = (props) => {
  return <div className={classes.holder}>{props.children}</div>;
};
