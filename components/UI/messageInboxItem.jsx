import MessageReplyItem from "../messageReplyItem";
const MessageInboxItem = (props) => {
  const { filtered, user, messId, added } = props;
  const ismapaple =
    filtered && filtered.replies && filtered.replies.length > 0 ? true : false;
  const allreplies = ismapaple && filtered.replies;
  // const notAdder =
  //   ismapaple && filtered.replies
  //     ? allreplies.filter((item) => item.added_by !== user.uid)
  //     : [];
  // const adder =
  //   ismapaple && filtered.replies
  //     ? allreplies.filter((item) => item.added_by === user.uid)
  //     : [];

  return (
    <div>
      <p style={{ textAlign: "center" }}>{filtered && filtered.text}</p>
      {ismapaple &&
        allreplies.map((item, indx) => (
          <div key={indx}>
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
