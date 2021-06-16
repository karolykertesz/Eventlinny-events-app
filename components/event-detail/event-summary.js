import classes from "./event-summary.module.css";
import TopImage from "../UI/topimage";
function EventSummary(props) {
  const { title, name, added_by } = props;
  console.log(added_by);
  return (
    <section className={classes.summary}>
      <h3>{title} category</h3>
      <TopImage added_by={added_by} />
    </section>
  );
}

export default EventSummary;
