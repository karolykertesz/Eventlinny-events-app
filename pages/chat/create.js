import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import classes from "../../components/UI/ui-modules/chat.module.css";
import ChatPop from "../../components/UI/reactbootstrap/chatpop";
const Chat = () => {
  const router = useRouter();
  const id = router.query.id;
  const [isprivate, setPrivate] = useState(false);
  const [truthy, setTruth] = useState(false);
  const [invite, setInvide] = useState(false);
  const [publicState, setPublic] = useState(false);
  const [current, setCurrent] = useState(null);

  const [roomseted, setR] = useState(false);
  const setStatus = (name) => {
    setCurrent(name);
    setTruth(!truthy);
  };

  return (
    <div className={classes.top}>
      <Form>
        <Form.Group controlId="formBasicCheckbox">
          <div className={classes.cover}>
            <div>
              <p className={classes.label}>
                {!isprivate
                  ? "Create a private chat by slide"
                  : "go back by slide"}
              </p>

              <label className={classes.switch}>
                <input
                  type="checkbox"
                  name="public"
                  label={
                    !publicState ? "create public Chat" : "Slide to go back"
                  }
                  onChange={(e) => setStatus(e.target.name)}
                />
                <span className={classes.slider + " " + classes.round}></span>
              </label>
            </div>

            <div>
              <p className={classes.label}>
                {!invite
                  ? "Invite existing Eventliny users"
                  : "go back by slide"}
              </p>
              <label className={classes.switch}>
                <input
                  type="checkbox"
                  onChange={(e) => setStatus(e.target.name)}
                  name="private"
                />
                <span className={classes.slider + " " + classes.round}></span>
              </label>
            </div>

            <div>
              <p className={classes.label}>
                {!invite
                  ? "Invite existing Eventliny users"
                  : "go back by slide"}
              </p>
              <label className={classes.switch}>
                <input
                  type="checkbox"
                  onChange={(e) => setStatus(e.target.name)}
                  name="invite"
                />
                <span className={classes.slider + " " + classes.round}></span>
              </label>
            </div>
          </div>
        </Form.Group>
      </Form>
      <div className={classes.pop}>
        {truthy && <ChatPop current={current} truthy={truthy} />}
      </div>
    </div>
  );
};
export default Chat;
