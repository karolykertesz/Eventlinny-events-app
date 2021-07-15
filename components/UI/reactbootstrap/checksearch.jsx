import React, { useState } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import { categories } from "../../../data";
import classes from "../../UI/ui-modules/search.module.css";
import Xcircle from "../../UI/icons/x-circle";
import firebase from "firebase";
import PublicItem from "../../publicitem";

const Search = (props) => {
  const [isStart, setStart] = useState(false);
  const [isValue, setValue] = useState();
  const [data, setData] = useState();
  const [selected, setselected] = useState();
  const [error, setError] = useState();
  const filteredCats = categories.filter((i) => i !== "create");
  const formSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!selected) {
      setError("Search CRITERIA Needs to be Selected");
      return;
    }
    const docref = await firebase
      .firestore()
      .collection("public_chat")
      .where(isValue, "==", selected);
    await docref.get().then(async (doc) => {
      let arr = [];
      await doc.forEach((i) => {
        console.log(doc.length);
        arr.push({
          id: i.id,
          ...i.data(),
        });
      });
      if (arr.length === 0) {
        setError("Please Refine Your Search");
        setData(null);
        return;
      } else {
        await setData(arr);
      }
    });
  };
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
          <div style={{ position: "relative" }}>
            <div className={classes.xcircle} onClick={() => setStart(false)}>
              <Xcircle color="peru" width="30px" />
            </div>
            <InputGroup className="mb-3" className={classes.inp}>
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
      <div className={classes.holder}>
        {error ? (
          <div>{error}</div>
        ) : (
          <div>
            {data &&
              data.map((item) => (
                <div key={item.id}>
                  <PublicItem item={item} />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Search;
