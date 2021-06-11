import * as map from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const EventMap = () => {
  map.accessToken = process.env.NEXT_PUBLC_MAPBOX_ID;
  const map = new map.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
  });
  return <div></div>;
};

export default EventMap;
