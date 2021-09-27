import classes from "../ui-modules/styled.module.css";
import React, { useEffect, useState } from "react";
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
