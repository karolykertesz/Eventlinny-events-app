import Link from "next/link";
import classes from "./button.module.css";
const Button = (props) => {
  const disab = props.isdisabled;
  if (props.link) {
    return (
      <span className={!disab ? classes.dispNone : ""}>
        <div className={classes.bttb}>
          <Link href={props.link}>
            <a className={classes.btn}>{props.children}</a>
          </Link>
        </div>
      </span>
    );
  }
  return (
    <button
      onClick={props.onClick}
      className={classes.btn}
      disabled={!disab ? "true" : "false"}
    >
      {props.children}
    </button>
  );
};
export default Button;
