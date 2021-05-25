import react, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./UI/ui-modules/locationState.module.css";
import { Pi } from "../pages/userpage/edit/location";
const LocationState = ({ countrycode, setselectedstate }) => {
  const [state, setState] = useState();
  useEffect(() => {
    return axios
      .get(
        `https://api.countrystatecity.in/v1/countries/${countrycode}/states`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "cUhDN01BSXF1eGVQbklLVHl1SmRGUk9BUXp4SklmamQydmxINWVZMg==",
          },
        }
      )
      .then((response) => {
        setState(response.data);
      })
      .then((re) => {
        console.log(re);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [countrycode]);
  return (
    <div className={classes.cover}>
      <Pi>Select your state</Pi>
      <select
        onChange={(e) => setselectedstate(e.target.value)}
        className={classes.mainselection}
      >
        {state &&
          state.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default LocationState;
