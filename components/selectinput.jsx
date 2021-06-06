import React, { useState } from "react";
import classes from "./UI/ui-modules/locationState.module.css";
import { categories } from "../data";
const SelectInput = (props) => {
  const [selectedCat, setSelected] = useState();
  return (
    <div>
      <div className={classes.cover}>
        <select
          className={classes.mainselection}
          onChange={(e) => props.setCat(e.target.value)}
        >
          <option>Select your category</option>
          {categories.map((i) => (
            <option key={i} value={selectedCat}>
              {i}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default SelectInput;
