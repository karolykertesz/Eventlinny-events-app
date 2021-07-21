import classes from "../UI/ui-modules/publicchat.module.css";
import ChatItem from "../UI/chatitem";
const MessageHolder = ({ messages, uid }) => {
  return (
    <div className={classes.msgHolder}>
      {messages.map((item) => (
        <div key={item.id}>
          <ChatItem item={item} uid={uid} />
        </div>
      ))}
    </div>
  );
};
export default MessageHolder;
