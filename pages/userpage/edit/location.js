import react, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { startup, startCities } from "../../../helpers/axios/getlocaion";
const LocationChange = () => {
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [countrycode, setCountrycode] = useState();
  const router = useRouter();
  const query = router.query;
  console.log(query);
  //   const startountry = startup();

  useEffect(() => {
    return startup(city, setCountry);
  }, []);
  useEffect(() => {
    return startCities(city, query.def, setCity);
  }, []);

  const onCountrychange = (e) => {
    setCountrycode(e.target.value);
  };
  const callCity = useCallback(() => {}, [setCountrycode]);
  const defaultCountry =
    country && country.filter((item) => item.iso2 === query.def);

  return (
    <div>
      <select onChange={() => onCountrychange()}>
        <option value={country && defaultCountry[0].iso2}>
          {country && defaultCountry[0].name}
        </option>
        {country &&
          country.map((item) => (
            <option key={item.id} value={item.iso2}>
              {item.name}
            </option>
          ))}
      </select>
      <select>
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

export default LocationChange;
