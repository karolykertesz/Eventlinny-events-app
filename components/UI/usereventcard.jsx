import Image from "next/image";
import { categories } from "../../data";
import classes from "../UI/ui-modules/user.event.card.module.css";

const UserEventcard = ({ item }) => {
  return (
    <div className={classes.top}>
      <div className={classes.imageHolder}>
        <Image
          width="150px"
          height="150px"
          quality={100}
          src={
            !categories.includes(item)
              ? `/images/sugimages/healthy.jpg`
              : `/images/sugimages/${item}.jpg`
          }
        />
      </div>
      <div className={classes.text}>{item}</div>
    </div>
  );
};
export default UserEventcard;
