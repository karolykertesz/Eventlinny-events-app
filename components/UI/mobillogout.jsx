import react from "react";
import classes from "./ui-modules/mobilLogout.module.css";
import Link from "next/link";

const MobileLogout = () => {
  return (
    <div className={classes.cover}>
      <ul className={classes.cover}>
        <li>
          <Link href="/signup">Sign Up</Link>
        </li>
        <li>
          <Link href="/login">Log In</Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileLogout;
