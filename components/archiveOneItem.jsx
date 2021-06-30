import Image from "next/image";
import classes from "../components/UI/ui-modules/archiveitem.module.css";
import { categories } from "../data";
import { Card, ListGroup } from "react-bootstrap";

const ArchiveOneItem = (props) => {
  const item = props.items;
  const findItem = categories.findIndex((i) => i === item.category);

  return (
    <div className={classes.top}>
      <div className={classes.imgHolder}>
        <Image
          width="250px"
          height="250px"
          quality={100}
          alt={item.category}
          src={
            findItem > -1
              ? `/images/${item.category}.jpg`
              : "/images/salmon.jpg"
          }
        />
      </div>
      <div className={classes.mainHolder}>
        <div className={classes.title}>{item.category}</div>
        <p>attendies: ({item.attendies.length})</p>
        <p>finished event</p>
        <p>name: {item.description}</p>
        <p> Creator: {item.created_by}</p>
        <p>images: ({item.archive_photos.length})</p>
        <p>location: {item.location}</p>
      </div>
    </div>
  );
};

export default ArchiveOneItem;
