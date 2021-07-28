import React, { useEffect, useCallback, useState, useRef } from "react";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import classes from "../UI/ui-modules/buttonpop.module.css";
import Link from "next/link";
import { useAuth } from "../Layout/UserContext";
import firebase from "firebase";
import Bell from "../UI/icons/bell";
import useBanned from "../../helpers/checkBanned";

const ButtonPop = (props) => {
  const user = useAuth().user;
  const isBanned = useBanned();
  const [note, setnote] = useState();
  const modeRef = useRef(true);
  const getNotifications = useCallback(async () => {
    let isNotification;
    const docref = firebase
      .firestore()
      .collection("notifications")
      .doc(user && user.uid);
    await docref.onSnapshot((doc) => {
      if (doc.exists) {
        isNotification = doc.data().unread.length > 0 ? true : false;
      } else {
        isNotification = null;
      }
    });
    return isNotification;
  }, [user]);
  useEffect(async () => {
    const isNote = await getNotifications();
    if (modeRef.current) {
      setnote(isNote);
    }
    return () => {
      modeRef.current = false;
    };
  }, [getNotifications]);

  const popover = (
    <Popover id="popover-basic" className={classes.top}>
      <Popover.Title as="h2" className="text-warning text-uppercase">
        Your Profile
      </Popover.Title>
      <Popover.Content>
        <Card>
          <Card.Header className={classes.header}>
            <Card.Title>{user && user.name}</Card.Title>
          </Card.Header>
          <Card.Body className={classes.body}>
            <div className={classes.link}>
              <Link href={`/userpage/${user && user.uid}`}>Your Info</Link>
            </div>
            <div className={classes.link}>
              <Link href={`/userpage/edit/createEvent/${user && user.uid}`}>
                create an event
              </Link>
            </div>
            <div className={classes.link}>
              <Link href={`/events/calendar/${user && user.uid}`}>
                Go Premium
              </Link>
            </div>
            <div className={classes.link}>
              {!isBanned ? (
                <>
                  <Link href={`/chat/create/?id=${user && user.uid}`}>
                    Create chat
                  </Link>
                </>
              ) : (
                <div className={classes.banned}>Chat disabled</div>
              )}
            </div>
            <div className={classes.link}>
              <Link href={`/notifications/get/?id=${user && user.uid}`}>
                Get Notifications
              </Link>
            </div>
            {note ? (
              <div className={classes.link}>
                <Link
                  href={`/notifications/notifications?id=${user && user.uid}`}
                >
                  <div className={classes.notidiv}>
                    <p className={classes.bellP}>Notifications</p>
                    <div className={note ? classes.bellAlert : classes.bell}>
                      <Bell />
                    </div>
                  </div>
                </Link>
              </div>
            ) : (
              <div className={classes.bellP}>
                You don't have any new notifications
              </div>
            )}
          </Card.Body>
        </Card>
      </Popover.Content>
    </Popover>
  );
  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
      <button aria-pressed="false" className={classes.popButton}>
        {props.children}
      </button>
    </OverlayTrigger>
  );
};
export default ButtonPop;
