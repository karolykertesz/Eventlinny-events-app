import MessageSideItem from "./messagesideitem";
import classes from "../UI/ui-modules/message.side.module.css";
import MessageTop from "./messagetop";
const MessageSidebar = (props) => {
  const { added, setAdded, messages } = props;
  console.log(messages);
  return (
    <div className={classes.topSide}>
      <MessageTop added={added} setAdded={setAdded} />
      <div className={added ? classes.top : classes.top + " " + classes.color}>
        <div classes={classes.list}></div>
      </div>
    </div>
  );
};

export default MessageSidebar;
