import react from "react";
import classes from "../components/UI/ui-modules/userpage.module.css";
const Userpage = ({ user, userInfo, location }) => {
  const filtereduser = user && [user.name, user.email];
  const userInfoNames = userInfo && userInfo.map((item) => item.name);

  return (
    <div className={classes.top}>
      <div className={classes.inner}></div>
    </div>
  );
};

export default Userpage;
