import Link from "next/link";
import { useContext } from "react";
import classes from "./main-header.module.css";
import { UserContext } from "./Layout";
const Header = () => {
  const user = useContext(UserContext);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">Events</Link>
      </div>
      <nav className={classes.navigation}>
        <ul>
          <li>
            <Link href="/events">All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
