import classes from "../UI/ui-modules/tinyspinner.module.css";

const Tinyspinner = (props) => {
  return (
    <div
      className={classes.spinner}
      style={{ width: props.width, height: props.height }}
    ></div>
  );
};
export default Tinyspinner;
