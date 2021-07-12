import React, { useState, useEffect, useCallback } from "react";
import {
  createPublic,
  createRoom,
  inviteUser,
} from "../../../helpers/wrappers/chatpop";
import { Form, InputGroup, Modal, FormControl } from "react-bootstrap";
import classes from "../../UI/ui-modules/chatpop.module.css";
import Tinyspinner from "../tinyspinner";
import { useAuth } from "../../Layout/UserContext";
import { categories } from "../../../data";

const ChatModal = (props) => {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [room, setRoom] = useState();
  const [password, setPassrord] = useState();
  const user = useAuth().user;
  const { current, roomOpen } = props;
  const selectedArray = () => {
    let selectedCategories = categories.filter((i) => i !== "create");
    if (!room) {
      selectedCategories.unshift("Nothing Selected");
    } else {
      selectedCategories.shift();
    }
    return selectedCategories.map((i) => i.toUpperCase());
  };

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
    setError(null);
    if (current === "invite") {
      let msg = await inviteUser(
        email.trim().toLowerCase(),
        room.trim().toLowerCase(),
        user.email
      );
      setLoading(false);
      setError(msg);
      setRoom("");
      setEmail("");
    }
    if (current === "private") {
      let msg = await createRoom(
        room.trim().toLowerCase(),
        user.email,
        password
      );
      setLoading(false);
      setError(msg);
      setRoom("");
    }
    if (current === "public") {
      if (!room) {
        setLoading(false);
        setError("No room name given");
        return;
      }
      let msg = await createPublic(user.email, room.toLowerCase(), user.name);
      setLoading(false);
      setError(msg);
      setRoom("");
    }
  };
  console.log(room, "jjj");
  return (
    <div className={classes.top}>
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        // centered="true"
        className={classes.top}
        {...props}
      >
        <Modal.Header closeButton>
          <Modal.Title className={classes.title}>
            {createMainTitle()}
          </Modal.Title>
        </Modal.Header>
        {loading ? (
          <Tinyspinner />
        ) : (
          <Modal.Body>
            <Form onSubmit={formSubmit}>
              {current === "public" && (
                <InputGroup className="mb-3">
                  <div className={classes.room}>
                    <select
                      onChange={(e) => setRoom(e.target.value)}
                      className={classes.select}
                    >
                      {selectedArray().map((item) => (
                        <option value={item} className={classes.opt} key={item}>
                          {item}
                        </option>
                      ))}
                    </select>
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
                      autoComplete="false"
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
                      autoComplete="false"
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
          </Modal.Body>
        )}
        <Modal.Footer className={classes.footer}>
          {error && (
            <div className={classes.footerDiv}>
              <p className={classes.error}>{error}</p>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ChatModal;
