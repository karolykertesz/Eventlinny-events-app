import React, { useState } from "react";
import { Form, Button, Popover } from "react-bootstrap";
import { useRouter } from "next/router";
import classes from "../../components/UI/ui-modules/chat.module.css";
import ChatPop from "../../components/UI/reactbootstrap/chatpop";
const Chat = () => {
  const router = useRouter();
  const id = router.query.id;
  const [isprivate, setPrivate] = useState(false);
  const [room, setRoom] = useState();

  const [roomseted, setR] = useState(false);
  return (
    <div className={classes.top}>
      <Form>
        {!isprivate && (
          <Form.Group>
            <Form.Label>Name Of the chat Room</Form.Label>
            <Form.Control
              type="text"
              placeholder="Create Your Room"
              onChange={(e) => setRoom(e.target.value)}
              value={room || ""}
            />
          </Form.Group>
        )}
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label={
              !roomseted
                ? "Private"
                : "Uncheck if you dont want to send anymore emails"
            }
            onChange={(e) => setPrivate(!isprivate)}
          />
          {isprivate && (
            <ChatPop
              setR={setR}
              btntitle={
                isprivate
                  ? "Add Email to send Invitation"
                  : "Unclick private to cancel"
              }
            />
          )}
        </Form.Group>
        {!isprivate && <Button type="submit">Submit</Button>}
      </Form>
    </div>
  );
};
export default Chat;
