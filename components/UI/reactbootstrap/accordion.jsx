import firebase from "firebase";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Card,
  Accordion,
  Button,
  Link,
  useAccordionToggle,
  Form,
} from "react-bootstrap";
import Plus from "../icons/plus";
import classes from "../ui-modules/accordion.module.css";
import { useAuth } from "../../Layout/UserContext";

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
  const id = props.docId;
  const user = props.user;
  const isTrue = props.isCom;
  const [text, settext] = useState();
  const [dis, setDis] = useState(false);
  const eventId = props.id;
  const userInfo = useAuth().user;
  const userid = userInfo && userInfo.uid;
  const sendsummit = (e) => {
    e.preventDefault();
    setDis(true);
    const docref = firebase.firestore().collection("comments").doc(id);
    const reDoc = firebase.firestore().collection("comments").doc(eventId);

    const date = new Date();

    if (isTrue) {
      return docref
        .update({
          replies: firebase.firestore.FieldValue.arrayUnion({
            id: uuidv4(),
            what: text,
            when: date,
            who: userid && userid,
            likes: [],
          }),
        })
        .then(() => setDis(false))
        .then(() => alert("You Got It"));
    } else {
      return reDoc
        .set(
          { comment_body: text, added_by: userid, likes: [], replies: [] },
          { merge: true }
        )
        .then(() => {
          alert("comment added");
        });
    }
  };
  return (
    <Accordion defaultActiveKey="0">
      <Card className={classes.card}>
        <Card.Header style={{ backgroundColor: "#f0e5c7" }}>
          <CustomToggle eventKey="0">
            <span style={{ width: "30px", height: "30px" }}>
              <Plus />
            </span>
          </CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
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
                <Button className={classes.button} disabled={dis} type="submit">
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default AddCommentsAccordion;
