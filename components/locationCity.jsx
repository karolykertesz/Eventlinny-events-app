import react, { useEffect, useState } from "react";
import axios from "axios";
import { Pi } from "../pages/userpage/edit/location";
import classes from "./UI/ui-modules/locationcity.module.css";
const LocationCity = ({ countrycode, setSelectedCity }) => {
  const [city, setCity] = useState();
  useEffect(() => {
    return axios
      .get(
        `https://api.countrystatecity.in/v1/countries/${countrycode}/cities`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "cUhDN01BSXF1eGVQbklLVHl1SmRGUk9BUXp4SklmamQydmxINWVZMg==",
          },
        }
      )
      .then((response) => {
        setCity(response.data);
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
      <Pi>Select Your City</Pi>
      <select
        onChange={(e) => setSelectedCity(e.target.value)}
        className={classes.mainselection}
      >
        {city &&
          city.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default LocationCity;
