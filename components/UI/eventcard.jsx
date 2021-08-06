import classes from "../UI/ui-modules/event.card.module.css";
import Image from "next/image";
import AddressIcon from "../UI/icons/address-icon";
import DateIcon from "../UI/icons/date-icon";
import UsersIcon from "../UI/icons/users";
import User from "../UI/icons/user-icon";
const Eventcard = (props) => {
  const { url, category, desc, created_by, address, attendies, date } = props;
  const smartDate =
    date &&
    new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  return (
    <div className={classes.card + " " + classes.middle}>
      <div className={classes.front}>
        <Image
          src={url}
          alt={category}
          width="350px"
          height="450px"
          quality={100}
        />
      </div>
      <div className={classes.back}>
        <div className={classes.backContent + " " + classes.middle}>
          <h3>{desc}</h3>
          <h3>{category}</h3>
          <div className={classes.backHolder}>
            <div className={classes.iconHolder}>
              <p>{created_by}</p>
              <User width="30px" height="30px" />
            </div>
            <div className={classes.iconHolder}>
              <p>{attendies.length}</p>
              <UsersIcon width="30px" height="30px" />
            </div>
            <div className={classes.iconHolder}>
              <p>{smartDate}</p>
              <DateIcon width="30px" height="30px" />
            </div>
            <div className={classes.iconHolder}>
              <p>{address}</p>

              <AddressIcon width="30px" height="30px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eventcard;
