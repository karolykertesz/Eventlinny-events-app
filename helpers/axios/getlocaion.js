import axios from "axios";
import { createFactory } from "react";

export const startup = (country, fn) => {
  if (!country) {
    return axios
      .get(`https://api.countrystatecity.in/v1/countries/`, {
        headers: {
          "X-CSCAPI-KEY":
            "cUhDN01BSXF1eGVQbklLVHl1SmRGUk9BUXp4SklmamQydmxINWVZMg==",
        },
      })
      .then(function (response) {
        return fn(response.data);
      })
      .then((re) => {
        console.log(re);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
};

export const startCities = (queryObj, fn) => {
  console.log(queryObj);

  return axios
    .get(`https://api.countrystatecity.in/v1/countries/${queryObj}/cities`, {
      headers: {
        "X-CSCAPI-KEY":
          "cUhDN01BSXF1eGVQbklLVHl1SmRGUk9BUXp4SklmamQydmxINWVZMg==",
      },
    })
    .then(function (response) {
      fn(response.data);
    })
    .then((re) => {
      console.log(re);
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const ifCity = async (queryObj, fn) => {
  return axios
    .get(`https://api.countrystatecity.in/v1/countries/${queryObj}/cities`, {
      headers: {
        "X-CSCAPI-KEY":
          "cUhDN01BSXF1eGVQbklLVHl1SmRGUk9BUXp4SklmamQydmxINWVZMg==",
      },
    })
    .then((response) => {
      () => fn(response.data);
      console.log(response.data, "the respponse");
    })
    .then((re) => {
      console.log(re);
    })
    .catch(function (error) {
      console.error(error);
    });
};
