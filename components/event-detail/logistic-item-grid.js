import React, { useState } from "react";
import classes from "../UI/ui-modules/logistic-item-grid.module.css";
import Button from "../UI/Button";
import DateIcon from "../UI/icons/date-icon";
import AddresIcon from "../UI/icons/address-icon";
import PersonIcon from "../UI/icons/person-icon";
import Eye from "../UI/icons/eye-icon";
import ArrowIcon from "../UI/icons/arrow-right-icon";
import NotApply from "../UI/icons/not-apply";
import Image from "next/image";
import ImagePop from "../imagePop";

import Link from "next/link";
import { categories } from "../../data";
import { useAuth } from "../Layout/UserContext";
import Tooltip from "../UI/reactbootstrap/tooltip";

const LogisticGrid = (props) => {
  const { start, category, location, id, attendies, added_by, isArchive } =
    props;

  const user = useAuth().user;
  const uid = user && user.uid;
  const isImageurl = categories.includes(category);

  const [isValid, setValid] = useState(() => {
    return start > new Date().getTime();
  });
  const addressV = location;
  const attEndiesLength = attendies.length > 0 ? attendies.length : 0;
  const linkTo = `/events/${id}`;
  return (
    <span className={!isValid ? classes.falseItem : ""}>
      <div className={classes.item}>
        <Image
          src={isImageurl ? `/images/${category}.jpg` : "/images/salmon.jpg"}
          alt={category}
          width={200}
          height={180}
          quality={100}
        />
        <div className={classes.content}>
          <div className={classes.summary}>
            <h2
              style={{
                textTransform: "uppercase",
                color: "burlywood",
                fontFamily: "Ariel",
              }}
            >
              {category}
            </h2>
            {!isValid && (
              <div className={classes.tooltipHolder}>
                {attendies.includes(uid) && (
                  <div className={classes.holder}>
                    <Tooltip title="Click and Upload images" place="bottom">
                      <ImagePop uid={id} />
                    </Tooltip>
                  </div>
                )}
                <div>
                  {isArchive && (
                    <Tooltip
                      title="Click and See images in event archive"
                      place="left"
                    >
                      <Link href={`/archive/${id}`}>
                        <div className={classes.eye}>
                          <Eye width="30px" color="burlywood" />
                        </div>
                      </Link>
                    </Tooltip>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className={classes.date}>
            <DateIcon />
            <time> {new Date(start).toLocaleDateString()}</time>
            <time>{new Date(start).toLocaleTimeString()}</time>
          </div>
          <div className={classes.address}>
            <AddresIcon />
            <address>{addressV}</address>
          </div>
          <div className={classes.address}>
            <PersonIcon />
            <address style={{ textAlign: "center", marginBottom: "1px" }}>
              {attEndiesLength}
            </address>
          </div>
          {!isValid && (
            <div className={classes.address}>
              <NotApply />
              <address style={{ textAlign: "center", marginBottom: "1px" }}>
                Finished Event
              </address>
            </div>
          )}
          <div className={classes.actions}>
            <Button link={linkTo} isdisabled={isValid}>
              Go to Event
              <span className={classes.icon}>
                <ArrowIcon />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </span>
  );
};

export default LogisticGrid;
