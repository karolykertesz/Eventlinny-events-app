import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useRedirect } from "../../../helpers/validatehelp";
import axios from "axios";

const Item = () => {
  const router = useRouter();
  const redirect = useRedirect();

  useEffect(() => {
    return redirect;
  }, []);
  useEffect(() => {
    const mess = axios
      .get("https://api.countrystatecity.in/v1/countries", {
        headers: {
          "X-CSCAPI-KEY":
            "cUhDN01BSXF1eGVQbklLVHl1SmRGUk9BUXp4SklmamQydmxINWVZMg==",
        },
      })
      .then(function (response) {
        console.log(response.data.length);
      })
      .then((re) => {
        console.log(re);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  const query = router.query;
  console.log(query);
  return <div></div>;
};

export default Item;
