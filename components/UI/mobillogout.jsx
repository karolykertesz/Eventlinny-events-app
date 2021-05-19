import react, { useState } from "react";
import classes from "./ui-modules/mobilLogout.module.css";
import Link from "next/link";

const MobileLogout = () => {
  const [location, setlocation] = useState("");

  return (
    <div className={classes.cover}>
      <ul className={classes.cover}>
        <li
          onClick={() => setlocation("signup")}
          className={location === "signup" ? classes.btnn : classes.loc}
        >
          <Link href="/signup">Sign Up</Link>
        </li>

        <li
          onClick={() => setlocation("login")}
          className={location === "login" ? classes.btnn : classes.loc}
        >
          <Link href="/login">Log In</Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileLogout;
