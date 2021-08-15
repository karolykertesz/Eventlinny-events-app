import classes from "../UI/ui-modules/message.bord.module.css";
import Xcircle from "../UI/icons/x-circle";

const MessageTop = (props) => {
  const { added, setAdded } = props;
  return (
    <div className={added ? classes.topDiv : classes.topDiv + " " + classes.c}>
      <input
        className={classes.tog}
        type="checkbox"
        id="toggle"
        onChange={() => setAdded(!added)}
      />
      <span className={classes.spanInput}>
        <label htmlFor="toggle">
          <Xcircle width="30px" color="white" />
        </label>
      </span>
      <p className={!added ? classes.p : ""}>
        {added ? "Your Messages" : "Recived messages"}
      </p>
    </div>
  );
};

export default MessageTop;
