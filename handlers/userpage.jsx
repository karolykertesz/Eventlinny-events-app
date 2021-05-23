import react, { useReducer } from "react";
import Link from "next/link";
import classes from "../components/UI/ui-modules/userpage.module.css";
import { VscChromeClose } from "react-icons/vsc";
import { IconContext } from "react-icons";
const Userpage = ({ user, userInfo, location }) => {
  const filtereduser = user && user;
  const userInfoNames = userInfo && userInfo.map((item) => item.name);
  const userLocation = location && location.location;

  return (
    <>
      {!user || !location || !userInfo ? (
        <div>Loadin ...</div>
      ) : (
        <div className={classes.top}>
          <div className={classes.inner}>
            <ul className={classes.userInfo}>
              <li>
                <p>Name: {filtereduser && filtereduser.name}</p>
                <p>
                  <Link href="/userpage/edit/name?col=auth">Change ...</Link>
                </p>
              </li>
              <li>
                <p>email: {filtereduser.email}</p>
                <p>
                  <Link href="/userpage/edit/email?col=auth">Change ...</Link>
                </p>
              </li>
              <li>
                <p>Your Location: {userLocation}</p>
                <p>
                  <Link href="/userpage/edit/email?col=location">
                    Change ...
                  </Link>
                </p>
              </li>
            </ul>
            <ul className={classes.list}>
              {userInfoNames.map((item) => (
                <li key={item} className={classes.listitem}>
                  {item}
                  <IconContext.Provider value={{ className: classes.icon }}>
                    <div>
                      <VscChromeClose />
                    </div>
                  </IconContext.Provider>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Userpage;
