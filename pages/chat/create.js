import React, { useState, useRef } from "react";
import { Form, Button, Popover } from "react-bootstrap";
import { useRouter } from "next/router";
import classes from "../../components/UI/ui-modules/chat.module.css";
import ChatPop from "../../components/UI/reactbootstrap/chatpop";
const Chat = () => {
  const router = useRouter();
  const id = router.query.id;
  const [isprivate, setPrivate] = useState(false);

  return (
    <div className={classes.top}>
      <Form>
        <Form.Group>
          <Form.Label>Name Of the chat Room</Form.Label>
          <Form.Control type="text" placeholder="Create Your Room" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Private"
            onChange={(e) => setPrivate(!isprivate)}
          />
          {isprivate && (
            <ChatPop
              btntitle={
                isprivate
                  ? "Add Email to send Invitation"
                  : "Unclick private to cancel"
              }
            />
          )}
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};
export default Chat;
