import classes from "../UI/ui-modules/notification.item.module.css";
const NotiItem = ({ item, cat }) => {
  return (
    <div className={classes.cover}>
      <div className={cat === "read" ? classes.inactive : classes.btnDiv}>
        <div className={classes.control}>
          {item.text.map((it) => (
            <p key={it}>{it}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
export default NotiItem;
