import { Card, Popover, OverlayTrigger } from "react-bootstrap";
import classes from "../components/UI/ui-modules/imagePop.module.css";
import Photo from "../components/UI/icons/photo";
import firebase from "firebase";
import { useAuth } from "./Layout/UserContext";
const ImagePop = (prop) => {
  const user = useAuth().user && useAuth().user;

  const popover = (
    <Popover id="popover-basic" className={classes.top}>
      <Popover.Title as="h3" className={classes.title}>
        Add and View Your Images In Archive
      </Popover.Title>
      <Popover.Content>
        <Card>
          <Card.Body>
            <p className={classes.text}>Upload</p>
            <input type="file" />
          </Card.Body>
          <Card.Footer>
            <button onClick={() => {}} className={classes.send}>
              Send
            </button>
          </Card.Footer>
        </Card>
      </Popover.Content>
    </Popover>
  );
  return (
    <OverlayTrigger trigger="click" placement="left" overlay={popover}>
      <button className={classes.btn}>
        <Photo width="30px" color="burlywood" />
      </button>
    </OverlayTrigger>
  );
};

export default ImagePop;
