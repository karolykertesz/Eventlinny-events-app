import classes from "./UI/ui-modules/meeting-items.module.css";
import { selectedCategories } from "../data";
const MeetingItems = ({ meeting }) => {
  const currentDate = new Date();
  const { category, join_url, meet_starts, meeeting_starts, description } =
    meeting;
  const meet_st = new Date(meet_starts.seconds * 1000);
  const isMeetting =
    new Date(meet_st.setMinutes(meet_st.getMinutes() - 30)) > currentDate
      ? "Your Meeting didn't start ,yet"
      : currentDate > new Date(meet_st.setMinutes(meet_st.getMinutes() + 30))
      ? "Sorry, Your meeting Already started"
      : "Go to meeting";

  const isValid =
    new Date(meet_st.setMinutes(meet_st.getMinutes() + 30)) < currentDate ||
    new Date(meet_st.setMinutes(meet_st.getMinutes() - 30)) > currentDate
      ? false
      : true;
  return (
    <div
      className={
        isValid
          ? classes.container
          : classes.container + " " + classes.contDisabled
      }
    >
      <div className={classes.imageHolder}>
        <img
          src={
            selectedCategories.includes(category)
              ? `/images/sugimages/${category}.jpg`
              : "/images/sugimages/healthy.jpg"
          }
        />
      </div>
      <div className={classes.meetingDate}>
        <p>{meeeting_starts}</p>
      </div>
      <div className={classes.description}>
        <p>{description}</p>
      </div>
      <div className={classes.buttonComp}>
        <a href={isValid ? join_url : "#"} target="_blank">
          <button type="button" disabled={!isValid}>
            {isMeetting}
          </button>
        </a>
      </div>
    </div>
  );
};

export default MeetingItems;
