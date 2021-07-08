import Image from "next/image";
import classes from "../UI/ui-modules/notification.get.module.css";
const NotiItem = ({ item, cat }) => {
  return (
    <div className={cat.includes(item) ? classes.inactive : classes.btnDiv}>
      {item}
    </div>
  );
};
export default NotiItem;
