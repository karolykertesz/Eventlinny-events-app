import axios from "axios";

export const startup = (country, fn) => {
  if (!country) {
    const mess = axios
      .get(`https://api.countrystatecity.in/v1/countries/`, {
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
  }
};

export const startCities = (city, queryObj, fn) => {
  if (!city) {
    const mess = axios
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
  }
};
