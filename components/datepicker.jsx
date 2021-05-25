import React, { useState } from "react";
import DatePicker from "react-datepicker";
require("react-datepicker/dist/react-datepicker.css");
import classes from "./UI/ui-modules/datepicker.module.css";
// import { registerLocale, setDefaultLocale } from "react-datepicker";
// import hu from "date-fns/locale/hu";
// registerLocale("hu", hu);

const Datepicker = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [date, setEndDate] = useState(null);
  const [isopen, setisopen] = useState(false);
  const [message, setmessage] = useState("Click to open!");
  const onChange = (date) => {
    setEndDate(date);
  };
  const handleCalendarClose = () => setmessage("Click to open!");
  const handleCalendarOpen = () => setmessage("Add Your Birthday");
  return (
    <div className={classes.cover}>
      <DatePicker
        selected={date}
        onChange={onChange}
        startDate={startDate}
        placeholderText={message}
        onCalendarOpen={handleCalendarOpen}
        onCalendarClose={handleCalendarClose}
        isClearable
        calendarClassName={classes.calendar}
        className={classes.border}
      />
      <button className={classes.btn}>Add</button>
    </div>
  );
};

export default Datepicker;
