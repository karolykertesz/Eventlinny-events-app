import classes from "./UI/ui-modules/meeting-items.module.css";
import Image from "next/image";
import Link from "next/link";
import { selectedCategories } from "../data";
const MeetingItems = ({ meeting }) => {
  const currentDate = Date.now();
  const { category, join_url, meet_starts, meeeting_starts, description } =
    meeting;
  const meet_st = new Date(meet_starts.seconds * 1000).getTime();
  const isMeetting =
    meet_st - 1800 > currentDate
      ? "Your Meeting didn't start ,yet"
      : currentDate + 1800 > meet_st
      ? "Sorry, Your meeting Already started"
      : "Go to meeting";

  const isValid =
    meet_st - 1800 > currentDate || currentDate + 1800 > meet_st ? false : true;
  return (
    <div className={classes.container}>
      <div className={classes.imageHolder}>
        <Image
          width="100%"
          height="100%"
          quality={100}
          src={
            selectedCategories.includes(category)
              ? `/images/sugimages/${category}.jpg`
              : "/images/sugimages/healthy.jpg"
          }
        />
      </div>
      <div className={classes.mettingDate}>
        <p>{meeeting_starts}</p>
      </div>
      <div className={classes.description}>
        <p>{description}</p>
      </div>
      <div className={classes.buttonComp}>
        <a href={join_url} target="_blank">
          {isMeetting}
        </a>
      </div>
    </div>
  );
};

export default MeetingItems;
