import classes from "../UI/ui-modules/notification.item.module.css";
import Eye from "../UI/icons/eye-icon";
import EyeOff from "./icons/eyeoff";
import NotificationOvarlay from "../UI/reactbootstrap/notificationoverlay";
const NotiItem = ({ item, cat }) => {
  return (
    <div className={cat === "unread" ? classes.cover : classes.inactive}>
      <NotificationOvarlay body={item.created_at}>
        <div>
          <div className={classes.control}>
            {cat === "unread" ? (
              <div className={classes.inner}>
                <p className={classes.pi}>Unread</p>
                <Eye width="40px" heigth="50px" color="burlywood" />
              </div>
            ) : (
              <div className={classes.inner}>
                <p className={classes.pi}>Read</p>
                <EyeOff width="40px" heigth="50px" color="#dfd2d2" />
              </div>
            )}
          </div>
        </div>
      </NotificationOvarlay>
    </div>
  );
};
export default NotiItem;
