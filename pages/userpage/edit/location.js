import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { useRouter } from "next/router";
import axios from "axios";
import LocationCity from "../../../components/locationCity";
import LocationState from "../../../components/locationState";
import classes from "../../../components/UI/ui-modules/location.module.css";
import styled from "styled-components";
import { useRedirect } from "../../../helpers/validatehelp";

import { startup } from "../../../helpers/axios/getlocaion";
const LocationChange = () => {
  useRedirect();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [countrycode, setCountrycode] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [selectedState, setselectedstate] = useState();
  const [goback, setgoback] = useState(false);
  const [error, seterror] = useState(null);

  const router = useRouter();
  const query = router.query;
  const selectedCountry =
    country && country.filter((item) => item.iso2 === countrycode);

  const updatedvalues =
    selectedState && selectedCity && selectedCountry
      ? selectedCountry[0].name + " ," + selectedCity + " ," + selectedState
      : "";

  const cancelAll = () => {
    setselectedstate(undefined);
    setgoback(true);
  };

  const updatelocation = () => {
    if (
      (selectedCountry && selectedCity && selectedState, query.uid, countrycode)
    ) {
      const docRef = firebase.firestore().collection("cookies").doc(query.uid);
      return docRef
        .update({
          location: updatedvalues,
          country_code: countrycode,
        })
        .then(() => {
          router.push("/events/first");
        })
        .catch((err) => console.log(err));
    }
  };
  const uppdateOrnot = () => {
    setselectedstate(undefined);
    setSelectedCity(undefined);
    setgoback(false);
  };

  useEffect(() => {
    return new Promise((resolve, reject) => {
      resolve(startup(city, setCountry));
    })
      .then(() => {
        if (!countrycode) {
          return setCountrycode(query.def);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const defaultCountry =
    country && country.filter((item) => item.iso2 === query.def);

  return (
    <div className={classes.cover}>
      <Pi>Select Your country</Pi>
      <select
        onChange={(e) => setCountrycode(e.target.value)}
        className={classes.mainselection}
      >
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
      <LocationCity
        countrycode={countrycode}
        setSelectedCity={setSelectedCity}
      />
      {selectedCity && (
        <LocationState
          countrycode={countrycode}
          setselectedstate={setselectedstate}
        />
      )}
      {selectedState && (
        <Buttondiv>
          <ButtonCover>
            <button className={classes.btn} onClick={() => updatelocation()}>
              update
            </button>
          </ButtonCover>
          <ButtonCover>
            <button
              className={classes.btn + " " + classes.cancel}
              onClick={() => cancelAll()}
            >
              cancel
            </button>
          </ButtonCover>
        </Buttondiv>
      )}
      {goback && (
        <Buttondiv>
          <ButtonCover>
            <button className={classes.btn} onClick={() => uppdateOrnot()}>
              Continue
            </button>
          </ButtonCover>
          <ButtonCover>
            <button
              className={classes.btn + " " + classes.cancel}
              onClick={() => router.push("/events/first")}
            >
              Cancel All
            </button>
          </ButtonCover>
        </Buttondiv>
      )}
    </div>
  );
};

export default LocationChange;

export const Pi = styled.p`
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 20px;
  text-transform: uppercase;
  color: burlywood;
`;

export const Buttondiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 350px;
`;

export const ButtonCover = styled.span`
  width: 100%;
`;
