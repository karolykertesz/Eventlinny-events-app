import React, { Fragment } from "react";
import classes from "./main.footer.module.css";
import Head from "next/head";
const Footer = () => {
  return (
    <Fragment>
      <Head>
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
      </Head>

      <footer className={classes.mainfooter} role="contentinfo">
        <div className={classes.footerMiddle}>
          <div className="container">
            <div className={classes.row}>
              <div className="row">
                <div className={classes.pad}>
                  <ul>
                    <li>
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <a href="#">Contact</a>
                    </li>
                    <li>
                      <a href="#">News and Updates</a>
                    </li>
                    <li>
                      <a href="#">Report abuse</a>
                    </li>
                    <li>
                      <a href="#">Privacy Policy</a>
                    </li>
                    <ul
                      className={
                        classes.socialNetwork + " " + classes.socialCircle
                      }
                    >
                      <li>
                        <a
                          href="#"
                          className={classes.icoFacebook}
                          title="Facebook"
                        >
                          <i className="fa fa-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className={classes.icoLinkedin}
                          title="Linkedin"
                        >
                          <i className="fa fa-linkedin"></i>
                        </a>
                      </li>
                    </ul>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 copy">
                <p className={classes.pi}>
                  &copy; Copyright 2021 - Company Name. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};
export default Footer;
