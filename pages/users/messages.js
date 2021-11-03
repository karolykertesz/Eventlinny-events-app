import { useRedirect } from "../../helpers/validatehelp";
import { useAuth } from "../../components/Layout/UserContext";
import MessageBord from "../../components/UI/messagebord";
import useMessages from "../../helpers/firebase-hooks/get.messages";
import styled from "styled-components";
const Messages = () => {
  useRedirect();
  const user = useAuth().user;
  const uid = user && user.uid;
  const { messages } = useMessages(uid);
  return (
    <div>
      {messages ? (
        <MessageBord messages={messages && messages} user={user && user} />
      ) : (
        <NoMessage>
          Sorry, {user && user.name} You dont't have any sent or recived
          Messages
        </NoMessage>
      )}
    </div>
  );
};

export default Messages;

const NoMessage = styled.div`
  text-align: center;
  font-size: 22px;
  font-family: "Poetsen One", sans-serif;
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  color: burlywood;
  text-transform: capitalize;
`;
