import MessageReplyItem from "../messageReplyItem";
import classes from "../UI/ui-modules/message.reply.item.module.css";
const MessageInboxItem = (props) => {
  const { filtered, user, messId, added } = props;
  const ismapaple =
    filtered && filtered.replies && filtered.replies.length > 0 ? true : false;
  const allreplies = ismapaple && filtered.replies;

  return (
    <div className={classes.inboxHolder}>
      {ismapaple &&
        allreplies.map((item, indx) => (
          <div key={indx} className={classes.messageRow}>
            <MessageReplyItem
              item={item}
              user={user}
              messId={messId}
              added={added}
            />
          </div>
        ))}
    </div>
  );
};
export default MessageInboxItem;
