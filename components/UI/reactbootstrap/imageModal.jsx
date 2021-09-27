import { Modal } from "react-bootstrap";
import classes from "../../UI/ui-modules/imagemodal.module.css";
import Image from "next/image";

const ImageModal = (props) => {
  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered={true}
      className={classes.top}
      {...props}
    >
      <Modal.Header closeButton className={classes.head}>
        {props.title}
      </Modal.Header>
      <Modal.Body className={classes.body}>
        <Image
          src={props.url}
          width={props.width}
          height={props.height}
          quality={100}
        />
      </Modal.Body>
    </Modal>
  );
};
export default ImageModal;
