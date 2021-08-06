import Image from "next/image";
import classes from "../components/UI/ui-modules/archive.card.module.css";
import { categories } from "../data";
import Users from "../components/UI/icons/users";
import Photo from "../components/UI/icons/photo";
import Location from "../components/UI/icons/locationmarker";
import Title from "../components/UI/icons/title";
const ArchiveOneItem = (props) => {
  const item = props.items;
  const length = props.length;
  const findItem = categories.findIndex((i) => i === item.category);
  return (
    <div className={classes.cover}>
      <div className={classes.container}>
        <div className={classes.card}>
          <div className={classes.content}>
            <div className={classes.imgBox}>
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
            <div className={classes.contenBox}>
              <h4>{item.category} Event</h4>
            </div>
          </div>
          <ul className={classes.names}>
            <li>
              <Title color="" width="25px" />
              <p>{item && item.description}</p>
            </li>
            <li>
              <Users color="" width="25px" />
              <p>{item && item.attendies.length}</p>
            </li>
            <li>
              <Location width="25px" /> <p>{item && item.location}</p>
            </li>
            <li>
              <Photo width="25px" />
              <p>{item && item.archive_photos.length}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ArchiveOneItem;
