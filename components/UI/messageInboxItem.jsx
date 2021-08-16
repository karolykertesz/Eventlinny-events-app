import MessageReplyItem from "../messageReplyItem";
const MessageInboxItem = (props) => {
  const { filtered, user, messId } = props;

  const ismapaple =
    filtered && filtered.replies && filtered.replies.length > 0 ? true : false;
  return (
    <div>
      <p style={{ textAlign: "center" }}>{filtered && filtered.text}</p>
      {ismapaple &&
        filtered.replies.map((item, indx) => (
          <div key={indx}>
            <MessageReplyItem item={item} user={user} messId={messId} />
          </div>
        ))}
    </div>
  );
};
export default MessageInboxItem;
