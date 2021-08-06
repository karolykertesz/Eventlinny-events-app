import classes from "./event-summary.module.css";
import TopImage from "../UI/topimage";
function EventSummary(props) {
  const { title } = props;
  return (
    <section className={classes.summary}>
      <h3>{title} category</h3>
    </section>
  );
}

export default EventSummary;
