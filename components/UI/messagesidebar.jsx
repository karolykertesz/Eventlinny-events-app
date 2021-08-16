import MessageSideItem from "./messagesideitem";
import classes from "../UI/ui-modules/message.side.module.css";
import MessageTop from "./messagetop";
import { useAuth } from "/components/Layout/UserContext";
const MessageSidebar = (props) => {
  const user = useAuth().user;
  const uid = user && user.uid;
  const { added, setAdded, messages, setMessid } = props;
  const filteredMessages = !added
    ? messages.filter((m) => m.added_by !== uid)
    : messages.filter((m) => m.added_by === uid);
  return (
    <div className={classes.topSide}>
      <MessageTop added={added} setAdded={setAdded} setMessid={setMessid} />
      <div className={added ? classes.top : classes.top + " " + classes.color}>
        <div classes={classes.list}>
          {messages &&
            filteredMessages.map((message) => (
              <div key={message.id} onClick={() => setMessid(message.id)}>
                <MessageSideItem message={message} added={added} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MessageSidebar;
