import React, { useState } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import { categories } from "../../../data";
import classes from "../../UI/ui-modules/search.module.css";

const Search = (props) => {
  const [isStart, setStart] = useState(false);
  const [isValue, setValue] = useState();
  const [selected, setselected] = useState();
  const [error, setError] = useState();
  const filteredCats = categories.filter((i) => i !== "create");
  const formSubmit = () => {};
  const setVal = (val) => {
    setValue(val);
    setStart(true);
  };
  return (
    <div className={classes.top}>
      <p>Search by Category Or Host Or Chat ID</p>
      <Form onSubmit={formSubmit}>
        {!isStart ? (
          <div className={classes.selectDiv}>
            <select onChange={(e) => setVal(e.target.value)}>
              <option>REFINE YOUR SEARCH CRITERIA</option>
              <option value="id">BY ID</option>
              <option value="category">BY CATEGORY </option>
              <option value="host">BY HOST NAME</option>
            </select>
          </div>
        ) : (
          <div>
            <InputGroup className="mb-3">
              {isValue === "category" ? (
                <div className={classes.selectDiv}>
                  <select onChange={(e) => setselected(e.target.value)}>
                    <option>SELECT FROM CATEGORIES</option>
                    {filteredCats.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className={classes.input}>
                  <FormControl
                    placeholder={`Search BY  ${isValue}`}
                    type="text"
                    value={selected || ""}
                    onChange={(e) => setselected(e.target.value)}
                  />
                </div>
              )}
            </InputGroup>
            <button className={classes.btn}>SEND</button>
          </div>
        )}
      </Form>
    </div>
  );
};
export default Search;
