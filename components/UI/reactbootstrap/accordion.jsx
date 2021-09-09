import firebase from "firebase";
import React, { useState } from "react";
import {
  Card,
  Accordion,
  Button,
  useAccordionToggle,
  Form,
} from "react-bootstrap";
import Plus from "../icons/plus";
import classes from "../ui-modules/accordion.module.css";
import { useAuth } from "../../Layout/UserContext";
import Tinyspinner from "../tinyspinner";

const CustomToggle = ({ children, eventKey }) => {
  const toggleButton = useAccordionToggle(eventKey, () => {
    console.log("h");
  });
  return (
    <div onClick={toggleButton} className={classes.top}>
      {children}
    </div>
  );
};

const AddCommentsAccordion = (props) => {
  const id = props.id;
  const user = props.user;
  const isTrue = props.isCom;
  const [text, settext] = useState();
  const [dis, setDis] = useState(false);
  const [loading, SetLoading] = useState(false);
  const eventId = props.id;
  const userInfo = useAuth().user;
  const userid = userInfo && userInfo.uid;
  const sendsummit = (e) => {
    e.preventDefault();
    SetLoading(true);
    const docref = firebase
      .firestore()
      .collection("user_add_events")
      .doc(id)
      .collection("comments")
      .doc("comment");

    const date = new Date();
    return docref
      .set({
        added_at: date,
        added_by: userid && userid,
        replies: [{ what: text, when: date, who: userid && userid }],
        comment_body: text,
        added_by: userid && userid,
        likes: [],
      })
      .then(() => SetLoading(false))
      .then(() => alert("You Got It"));
  };

  return (
    <Accordion defaultActiveKey="0">
      <Card className={classes.card}>
        <Card.Header style={{ backgroundColor: "#f0e5c7" }}>
          <CustomToggle eventKey="0">
            <Plus width="30px" height="40px" />
            (0) comment
          </CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          {!loading ? (
            <Card.Body className={classes.body}>
              <Form onSubmit={sendsummit}>
                <Form.Group>
                  <Form.Label>
                    {isTrue ? "Add Comment" : "Create Comment for the Event"}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your comment"
                    onChange={(e) => settext(e.target.value)}
                    value={text}
                    className={classes.input}
                  />
                  <Button
                    className={classes.button}
                    disabled={dis}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          ) : (
            <div style={{ background: "#fff", height: "100%" }}>
              <Tinyspinner width="150px" height="150px" />
            </div>
          )}
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default AddCommentsAccordion;
