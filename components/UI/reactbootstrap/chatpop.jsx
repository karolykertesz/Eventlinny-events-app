import React, { useState } from "react";
import {
  createPublic,
  createRoom,
  inviteUser,
} from "../../../helpers/wrappers/chatpop";

import { useAuth } from "../../Layout/UserContext";
import {
  Popover,
  Form,
  InputGroup,
  OverlayTrigger,
  FormControl,
  Button,
} from "react-bootstrap";
import classes from "../../UI/ui-modules/chatpop.module.css";
import Tinyspinner from "../tinyspinner";

const ChatPop = ({ current, truthy }) => {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [room, setRoom] = useState();
  const [password, setPassrord] = useState();

  const user = useAuth().user;

  const createMainTitle = () => {
    let title;
    if (current) {
      if (current === "invite") {
        title = "Add your Room name and Send Your invitation Email";
      } else if (current === "private") {
        title = "create Your Private Room and Password";
      } else if (current === "public") {
        title = "Create a Public Chat Room";
      }
    }
    return title;
  };
  const createPopTitle = () => {
    let title;
    if (current) {
      if (current === "invite") {
        title = "Add Your Room First ,Then User email";
      } else if (current === "private") {
        title = "Create Your Room name ,Than password";
      } else if (current === "public") {
        title = "Create a Public Chat Room for Everyone";
      }
    }
    return title;
  };
  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (current === "invite") {
      let msg = await inviteUser(email, room);
      setLoading(false);
      setError(msg);
    }
    if (current === "private") {
      let msg = await createRoom(room, user.email, password);
      setLoading(false);
      setError(msg);
    }
    if (current === "public") {
      let msg = await createPublic(user.email, room, user.name);
      setLoading(false);
      setError(msg);
    }
  };

  const popover = (
    <Popover id="popover-basic" className={classes.top}>
      <Popover.Title as="h3" className={classes.title}>
        {createMainTitle()}
      </Popover.Title>
      <Popover.Content>
        {loading ? (
          <Tinyspinner />
        ) : (
          <Form onSubmit={formSubmit}>
            {current === "public" && (
              <InputGroup className="mb-3">
                <div className={classes.room}>
                  <FormControl
                    placeholder="Add Your Chat Room Name"
                    type="text"
                    autoComplete={"false"}
                    value={room || ""}
                    onChange={(e) => setRoom(e.target.value)}
                    className={classes.input}
                  />
                </div>
              </InputGroup>
            )}
            {current === "invite" && (
              <InputGroup className="mb-3">
                <div className={classes.room}>
                  <FormControl
                    placeholder="Add Your Chat Room Name"
                    type="text"
                    value={room || ""}
                    onChange={(e) => setRoom(e.target.value)}
                    className={classes.input}
                    autoComplete={"false"}
                  />
                </div>
                <div className={classes.control}>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text>@</InputGroup.Text>
                    </InputGroup.Prepend>

                    <FormControl
                      placeholder="Invitation Email Address"
                      type="email"
                      value={email || ""}
                      onChange={(e) => setEmail(e.target.value)}
                      className={classes.input}
                    />
                  </InputGroup>
                </div>
              </InputGroup>
            )}
            {current === "private" && (
              <InputGroup className="mb-3">
                <div className={classes.room}>
                  <FormControl
                    placeholder="Add Your Chat Room Name"
                    type="text"
                    value={room || ""}
                    onChange={(e) => setRoom(e.target.value)}
                    className={classes.input}
                    autoComplete={"false"}
                  />
                </div>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Create password"
                    type="password"
                    value={password || ""}
                    onChange={(e) => setPassrord(e.target.value)}
                    className={classes.input}
                    autoComplete="false"
                  />
                </InputGroup>
              </InputGroup>
            )}

            <button type="submit" className={classes.formButton}>
              Send
            </button>
          </Form>
        )}
        {error && (
          <div>
            <p className={classes.error}>{error}</p>
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
  return (
    <div>
      {truthy && (
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
          <Button className={classes.popBtn}>{createPopTitle()}</Button>
        </OverlayTrigger>
      )}
    </div>
  );
};
export default ChatPop;
