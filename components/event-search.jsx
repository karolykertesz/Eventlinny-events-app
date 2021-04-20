import { useRef } from "react";
import Button from "../components/UI/Button";
import classes from "./event-saerch.module.css";
const EventSearch = (props) => {
  const yearRef = useRef();
  const montRef = useRef();
  const onClick = () => {};
  const onSubmit = (e) => {
    e.preventDefault();
    const yearSelected = yearRef.current.value;
    const selectedMonth = montRef.current.value;
    props.onSelected(yearSelected, selectedMonth);
  };
  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearRef}>
            <option vlaue="2021">2021</option>
            <option value="2021">2022</option>
          </select>
        </div>
        <div>
          <div className={classes.control}>
            <label htmlFor="month">Month</label>
            <select id="month" ref={montRef}>
              <option value="1">January</option>
              <option value="2">February</option>a
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
        </div>
      </div>
      <Button>Find</Button>
    </form>
  );
};

export default EventSearch;
