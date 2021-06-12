import React, { useEffect, useState, Fragment } from "react";
import { Image } from "next/image";
import firebase from "firebase";

import classes from "../components/UI/ui-modules/eventmap.module.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ID;
import { addlocation } from "../helpers/axios/add";

const EventMap = ({ location, cd, added_by }) => {
  const [popOpen, setOpen] = useState(false);
  const [loc, setLoc] = useState();
  const [imgUrl, setImg] = useState();
  const [viewport, setViewport] = useState();
  useEffect(() => {
    if (!location) return;
    return addlocation(location).then((item) => {
      const { zoom, latitude, longitude } = item;
      return setViewport({
        zoom: zoom,
        latitude: latitude,
        longitude: longitude,
      });
    });
  }, []);
  console.log(viewport);
  useEffect(() => {
    return firebase
      .firestore()
      .collection("user_aditional")
      .doc(added_by)
      .get()
      .then((docu) => {
        if (docu.exists) {
          const data = docu.data();
          const url = data.image_url ? data.image_url : null;
          return setImg(url);
        } else {
          return;
        }
      });
  }, []);
  console.log(imgUrl);
  return (
    <div className={classes.conpI}>
      {viewport && (
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          width="170%"
          height="200px"
          onViewportChange={(viewport) => setViewport(viewport)}
          mapStyle="mapbox://styles/karesz37/ckpsl4rgp2wa317o4isgr3ivi"
        >
          <Marker longitude={viewport.longitude} latitude={viewport.latitude}>
            <button className={classes.btn} onClick={() => setOpen(true)}>
              <img src={"/images/mappin.svg"} />
            </button>
          </Marker>
          {popOpen && (
            <Popup
              longitude={viewport.longitude}
              latitude={viewport.latitude}
              onClose={() => setOpen(false)}
            >
              <div className={classes.text}>
                <ul>
                  <li>city: {location},</li>
                  {/* <li>country code:{cd}</li> */}
                </ul>
              </div>
            </Popup>
          )}
        </ReactMapGL>
      )}

      {/* <div className={classes.box}>
        <Image
          width={150}
          height={150}
          src={imgUrl ? imgUrl : "/images/noimage.svg"}
        />
      </div> */}
    </div>
  );
};
export default EventMap;
