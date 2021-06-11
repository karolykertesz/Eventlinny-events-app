import React, { useEffect, useState, Fragment } from "react";
import { Image } from "next/image";
import firebase from "firebase";

import classes from "../components/UI/ui-modules/eventmap.module.css";
import ReactMapGL, { Marker } from "react-map-gl";
const MAPBOX_TOKEN =
  "pk.eyJ1Ijoia2FyZXN6MzciLCJhIjoiY2twcmszeTN6MDk4bzJubW5qcDgyMjBsYyJ9.kbGXDWCy-F1IGRt8STxjAg";

const EventMap = ({ latitude, longitude }) => {
  const [viewport, setViewport] = useState({
    latitude: latitude,
    longitude: longitude,
    zoom: 6,
    // width: "100%",
    // height: "100%",
  });

  return (
    <div className={classes.conpI}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        width="170%"
        height="200px"
        onViewportChange={(viewport) => setViewport(viewport)}
        mapStyle="mapbox://styles/karesz37/ckpsl4rgp2wa317o4isgr3ivi"
      >
        <Marker longitude={longitude} latitude={latitude}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="red"
          >
            <path
              fill-rule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            />
          </svg>
        </Marker>
      </ReactMapGL>
      <div className={classes.box}></div>
    </div>
  );
};
export default EventMap;
