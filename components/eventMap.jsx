import React, { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import firebase from "firebase";
import { Pi } from "../components/UI/styledindex";
import "mapbox-gl/dist/mapbox-gl.css";

import classes from "../components/UI/ui-modules/eventmap.module.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ID;
import { addlocation } from "../helpers/axios/add";
const EventMap = ({ location, added_by, created_by }) => {
  const metRef = useRef(true);
  const [popOpen, setOpen] = useState(false);
  const [loc, setLoc] = useState();
  const [imgUrl, setImg] = useState();
  const [viewport, setViewport] = useState();
  const addData = useCallback(() => {
    if (metRef.current) {
      return firebase
        .firestore()
        .collection("user_aditional")
        .doc(added_by)
        .get()
        .then((docu) => {
          if (docu.exists) {
            const data = docu.data();
            const url = data.image_url ? data.image_url : null;
            if (metRef.current) {
              return setImg(url);
            }
          } else {
            return;
          }
        })
        .then(async () => {
          const { longitude, latitude } = await addlocation(location);
          return {
            zoom: 10,
            longitude,
            latitude,
          };
        })
        .then(({ zoom, longitude, latitude }) => {
          setViewport({
            zoom: zoom,
            longitude,
            latitude,
          });
        });
    }
  }, [metRef.current]);
  useEffect(() => {
    addData();
    return () => {
      metRef.current = false;
    };
  }, []);

  return (
    <div className={classes.conpI} style={{ marginBottom: "10px" }}>
      {viewport && (
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          width="200%"
          height="170px"
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
                  <li></li>
                </ul>
              </div>
            </Popup>
          )}
        </ReactMapGL>
      )}
    </div>
  );
};
export default EventMap;
