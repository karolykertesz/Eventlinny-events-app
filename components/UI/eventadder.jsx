import react, { useRef, useState, useCallback, useEffect } from "react";
import { Layer, ForMButton, Error, Pi } from "../../pages/signup";
import classes from "./ui-modules/login.module.css";
import { getcountries } from "../../helpers/axios/getlocaion";
import LocationCity from "../locationCity";
const Eventadder = ({ category, setlocation }) => {
  const [allcountrie, setAllcounries] = useState();
  const [selectedCountry, setselectedCountry] = useState();
  const [selectedcity, setSelectedCity] = useState();
  const [self, setself] = useState("");
  useEffect(() => {
    let mode = true;
    if (self === "self" && mode) {
      getcountries()
        .then((i) => setAllcounries(i.data))
        .then(() => {
          console.log("done");
        });
    }
    return () => (mode = false);
  }, [self]);
  return (
    <Layer>
      <div className={classes.form}>
        <form>
          {category === "create" ? (
            <div className={classes.control}>
              <label htmlFor="firstname">create your category</label>
              <input
                type="text"
                id="cat"
                name="createcat"
                //   ref={firstNameRef}
              />
            </div>
          ) : (
            <div className={classes.control}>
              <label htmlFor="firstname">Your Events category</label>
              <input
                type="text"
                id="category"
                name="category"
                //   ref={firstNameRef}
                disabled={true}
                value={category}
              />
            </div>
          )}
          <div className={classes.control}>
            <label htmlFor="firstname">Location</label>
            <select
              className={classes.mainselection}
              onChange={(e) => setself(e.target.value)}
            >
              <option value="">Select Location</option>
              <option value="online">online</option>
              <option value="self">Add Your location</option>
            </select>
            {self === "self" && allcountrie && (
              <div>
                <select
                  className={classes.mainselection}
                  onChange={(e) => setselectedCountry(e.target.value)}
                >
                  {allcountrie &&
                    allcountrie.map((item) => (
                      <option key={item.id} value={item.iso2}>
                        {item.name}
                      </option>
                    ))}
                </select>
                {selectedCountry && (
                  <LocationCity
                    countrycode={selectedCountry}
                    setSelectedCity={setSelectedCity}
                  />
                )}
              </div>
            )}
          </div>
        </form>
      </div>
    </Layer>
  );
};

export default Eventadder;
