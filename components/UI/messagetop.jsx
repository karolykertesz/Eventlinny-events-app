import classes from "../UI/ui-modules/message.bord.module.css";

const MessageTop = (props) => {
  const { added, setAdded, setMessid } = props;
  const setAddedAndNull = () => {
    setMessid(null);
    setAdded(!added);
  };
  return (
    <div className={added ? classes.topDiv : classes.topDiv + " " + classes.c}>
      <span className={classes.divider}>
        <label htmlFor="toggle" className={classes.switch}>
          <input
            className={classes.tog}
            type="checkbox"
            id="toggle"
            onChange={() => setAddedAndNull()}
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
