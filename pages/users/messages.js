import { useRedirect } from "../../helpers/validatehelp";
import { useAuth } from "../../components/Layout/UserContext";
import MessageBord from "../../components/UI/messagebord";
import useMessages from "../../helpers/firebase-hooks/get.messages";
const Messages = () => {
  useRedirect();
  const user = useAuth().user;
  const uid = user && user.uid;
  const { messages } = useMessages(uid);

  return (
    <div>
      {messages && (
        <MessageBord messages={messages && messages} user={user && user} />
      )}
    </div>
  );
};

export default Messages;
