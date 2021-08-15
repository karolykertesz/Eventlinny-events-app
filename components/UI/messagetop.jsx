import classes from "../UI/ui-modules/message.bord.module.css";
import Xcircle from "../UI/icons/x-circle";

const MessageTop = (props) => {
  const { added, setAdded } = props;
  return (
    <div className={added ? classes.topDiv : classes.topDiv + " " + classes.c}>
      <span className={classes.divider}>
        <label htmlFor="toggle" className={classes.switch}>
          <input
            className={classes.tog}
            type="checkbox"
            id="toggle"
            onChange={() => setAdded(!added)}
          />
          <span className={classes.slider + " " + classes.round}></span>
        </label>
        <p className={!added ? classes.p : ""}>
          {added ? "Your Messages" : "Recived messages"}
        </p>
      </span>
    </div>
  );
};

export default MessageTop;
