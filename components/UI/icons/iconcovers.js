import classes from "../ui-modules/styled.module.css";
export const IconDock = (props) => {
  const { icon: Icon } = props;
  return (
    <div className={classes.icontop}>
      <Icon />
    </div>
  );
};

export const ComentContainer = ({ children }) => {
  return <li className={classes.comentCont}>{children}</li>;
};
