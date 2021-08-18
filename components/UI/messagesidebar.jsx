import MessageSideItem from "./messagesideitem";
import classes from "../UI/ui-modules/message.side.module.css";
import MessageTop from "./messagetop";
import { useAuth } from "/components/Layout/UserContext";
const MessageSidebar = (props) => {
  const user = useAuth().user;
  const uid = user && user.uid;
  const { added, setAdded, messages, setMessid } = props;
  const addedMessages =
    messages && messages.filter((item) => item.added_by === uid);
  const recivedMessages =
    messages && messages.filter((item) => item.added_by !== uid);
  return (
    <div className={classes.topSide}>
      <MessageTop added={added} setAdded={setAdded} setMessid={setMessid} />
      <div className={added ? classes.top : classes.top + " " + classes.color}>
        <div classes={classes.listTop}>
          {messages && (
            <div>
              {!added
                ? recivedMessages.map((message) => (
                    <div
                      key={message.id}
                      onClick={() => setMessid(message.id)}
                      className={classes.list}
                    >
                      <MessageSideItem
                        message={message}
                        added={added}
                        user={user}
                      />
                    </div>
                  ))
                : addedMessages.map((message) => (
                    <div
                      key={message.id}
                      onClick={() => setMessid(message.id)}
                      className={classes.list}
                    >
                      <MessageSideItem
                        message={message}
                        added={added}
                        user={user}
                      />
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// messages.map((message) => (
//   <div key={message.id} onClick={() => setMessid(message.id)}>
//     <MessageSideItem message={message} added={added} user={user} />
//   </div>
// ))
export default MessageSidebar;
