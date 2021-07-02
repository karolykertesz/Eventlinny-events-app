import React, { useState } from "react";
import {
  Popover,
  Form,
  InputGroup,
  OverlayTrigger,
  FormControl,
  Button,
} from "react-bootstrap";
import classes from "../../UI/ui-modules/chatpop.module.css";
import firebase from "firebase";
const ChatPop = (props) => {
  const [email, setEmail] = useState();
  const formSubmit = (e) => {
    e.preventDefault();
  };
  const popover = (
    <Popover id="popover-basic" cla>
      <Popover.Title as="h3" className={classes.title}>
        Add invitation Email
      </Popover.Title>
      <Popover.Content>
        <Form onSubmit={formSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Email"
              aria-describedby="basic-addon1"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={classes.input}
            />
          </InputGroup>
          <button type="submit" className={classes.formButton}>
            Send
          </button>
        </Form>
      </Popover.Content>
    </Popover>
  );
  return (
    <div>
      <OverlayTrigger trigger="click" placement="right" overlay={popover}>
        <Button className={classes.popBtn}>{props.btntitle}</Button>
      </OverlayTrigger>
    </div>
  );
};
export default ChatPop;
