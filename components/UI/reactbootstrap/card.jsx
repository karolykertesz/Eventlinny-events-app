import React from "react";
import Card from "react-bootstrap/Card";
import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import classes from "../ui-modules/card.module.css";

const RecTCard = (props) => {
  return (
    <div className={classes.top}>
      <Card
        className={classes.topcard}
        style={{
          width: props.cardwidth,
          height: props.cargHeigth,
          backgroundColor: "#f0e5c7",
          // borderTop: "none",
        }}
      >
        <Card.Img variant="top" src={props.src} className={classes.img} />
        <Card.Body className={classes.body}>
          <Card.Title className={classes.title}>{props.title}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem className={classes.member}>
            {props.member}
          </ListGroupItem>
          <ListGroupItem>
            <Link href={props.memberlink}>View member</Link>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
};

export default RecTCard;
