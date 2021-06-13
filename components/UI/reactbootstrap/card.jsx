import React from "react";
import Card from "react-bootstrap/Card";
import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const RecTCard = (props) => {
  return (
    <div style={{ width: "150px", height: "150px", backgroundColor: "red" }}>
      <Card
        style={{
          width: props.cardwidth,
          height: props.cargHeigth,
          backgroundColor: "white",
        }}
      >
        <Card.Img
          variant="top"
          src={props.src}
          style={{
            borderRadius: "50%",
            width: "70px",
            height: "70px",
            margin: "0 auto",
            backgroundColor: "red",
          }}
        />
        <Card.Body>
          <Card.Title
            style={{ textAlign: "center", textTransform: "capitalize" }}
          >
            {props.title}
          </Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>{props.member}</ListGroupItem>
          <ListGroupItem>
            <Link href={props.memberlink}>View member</Link>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
};

export default RecTCard;
