import React, { useState } from "react";
import classes from "../UI/ui-modules/findselet.module.css";
import { categories } from "../../data";
const FindSelect = (props) => {
  const filteredcat = categories.filter((item) => item !== "create");
  const [selectedCat, setSelected] = useState();
  return (
    <div className={classes.top}>
      <div className={classes.cover}>
        <select
          className={classes.mainselection}
          onChange={(e) => props.setCat(e.target.value)}
        >
          <option>Select your category</option>
          {filteredcat.map((i) => (
            <option key={i} value={selectedCat}>
              {i}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default FindSelect;
