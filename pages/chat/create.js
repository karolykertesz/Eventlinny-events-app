import React, { useState, useRef } from "react";
import { Form } from "react-bootstrap";
import { useRouter } from "next/router";
import classes from "../../components/UI/ui-modules/chat.module.css";
import ChatModal from "../../components/UI/reactbootstrap/chatmodal";
import { useRedirect } from "../../helpers/validatehelp";
const Chat = () => {
  useRedirect();
  const router = useRouter();
  const id = router.query.id;
  const [truthy, setTruth] = useState(false);
  const [current, setCurrent] = useState(null);

  const publicRef = useRef();
  const privateRef = useRef();
  const inviteRef = useRef();
  const closeRef = () => {
    setTruth(false);
    if (current === "private") {
      privateRef.current.checked = false;
    }
    if (current === "public") {
      publicRef.current.checked = false;
    }
    if (current === "invite") {
      inviteRef.current.checked = false;
    }
  };
  const setStatus = (name, ref) => {
    setCurrent(name);
    setTruth(!truthy);
  };

  return (
    <div className={classes.top}>
      <Form>
        <Form.Group controlId="formBasicCheckbox">
          <div className={classes.cover}>
            <div>
              <p className={classes.label}>Create a Public chat by slide</p>
              <label className={classes.switch}>
                <input
                  type="checkbox"
                  name="public"
                  ref={publicRef}
                  onChange={(e) => setStatus(e.target.name)}
                />
                <span className={classes.slider + " " + classes.round}></span>
              </label>
            </div>

            <div>
              <p className={classes.label}>Create a Private Chat by Slide</p>
              <label className={classes.switch}>
                <input
                  type="checkbox"
                  onChange={(e) => setStatus(e.target.name)}
                  name="private"
                  ref={privateRef}
                />
                <span className={classes.slider + " " + classes.round}></span>
              </label>
            </div>

            <div>
              <p className={classes.label}>Invite existing Eventliny users</p>
              <label className={classes.switch}>
                <input
                  type="checkbox"
                  onChange={(e) => setStatus(e.target.name)}
                  name="invite"
                  ref={inviteRef}
                />
                <span className={classes.slider + " " + classes.round}></span>
              </label>
            </div>
          </div>
        </Form.Group>
      </Form>
      <div className={classes.pop}>
        <ChatModal current={current} show={truthy} onHide={() => closeRef()} />
      </div>
    </div>
  );
};
export default Chat;
