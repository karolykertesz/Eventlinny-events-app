import react from "react";
import Head from "next/head";
// import { ZoomMtg } from "@zoomus/websdk";

import classes from "../UI/ui-modules/main.meeting.module.css";
const BigTest = () => {
  return (
    <div>
      <Head>
        <link
          type="text/css"
          rel="stylesheet"
          href="https://source.zoom.us/1.9.8/css/bootstrap.css"
        />
        <link
          type="text/css"
          rel="stylesheet"
          href="https://source.zoom.us/1.9.8/css/react-select.css"
        />
      </Head>
      <div style={{ marginTop: "100px" }}>
        {/* <iframe src={meetingUrl ? meetingUrl : ""} frameBorder="0"></iframe> */}
        <nav className="navbar navbar-inverse nav-tool">
          <div>
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                Zoom WebSDK
              </a>
            </div>
            <div id="navbar" className={classes.websdktest}>
              <form className="navbar-form navbar-right" id="meeting_form">
                <div className="form-group">
                  <input
                    type="text"
                    name="display_name"
                    className={classes.display_name}
                    value="1.9.8#CDN"
                    maxLength="100"
                    placeholder="Name"
                    className="form-control"
                    required
                    style={{ width: "150px" }}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="meeting_number"
                    id="meeting_number"
                    value=""
                    maxLength="200"
                    // style="width:150px"
                    placeholder="Meeting Number"
                    className="form-control"
                    required
                    style={{ width: "150px" }}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="meeting_pwd"
                    id="meeting_pwd"
                    value=""
                    // style="width:150px"
                    maxLength="32"
                    placeholder="Meeting Password"
                    className="form-control"
                    style={{ width: "150px" }}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="meeting_email"
                    id="meeting_email"
                    value=""
                    style={{ width: "150px" }}
                    // style="width:150px"
                    maxLength="32"
                    placeholder="Email option"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <select id="meeting_role" className={classes.sdkSelect}>
                    <option value="0">Attendee</option>
                    <option value="1">Host</option>
                    <option value="5">Assistant</option>
                  </select>
                </div>
                <div className="form-group">
                  <select id="meeting_china" class="sdk-select">
                    <option value="0">Global</option>
                    <option value="1">China</option>
                  </select>
                </div>
                <div class="form-group">
                  <select id="meeting_lang" class="sdk-select">
                    <option value="en-US">English</option>
                    <option value="de-DE">German Deutsch</option>
                    <option value="es-ES">Spanish Español</option>
                    <option value="fr-FR">French Français</option>
                    <option value="jp-JP">Japanese 日本語</option>
                    <option value="pt-PT">Portuguese Portuguese</option>
                    <option value="ru-RU">Russian Русский</option>
                    <option value="zh-CN">Chinese 简体中文</option>
                    <option value="zh-TW">Chinese 繁体中文</option>
                    <option value="ko-KO">Korean 한국어</option>
                    <option value="vi-VN">Vietnamese Tiếng Việt</option>
                    <option value="it-IT">Italian italiano</option>
                  </select>
                </div>

                <input type="hidden" value="" id="copy_link_value" />
                <button type="submit" class="btn btn-primary" id="join_meeting">
                  Join
                </button>
                <button type="submit" class="btn btn-primary" id="clear_all">
                  Clear
                </button>
                <button
                  type="button"
                  link=""
                  //   onclick="window.copyJoinLink('#copy_join_link')"
                  class="btn btn-primary"
                  id="copy_join_link"
                >
                  Copy Direct join link
                </button>
              </form>
            </div>
          </div>
        </nav>
        <div id="show-test-tool">
          <button
            type="submit"
            className={"btn btn-primary" + " " + classes.showTest}
            title="show or hide top test tool"
          >
            Show
          </button>
        </div>
      </div>
    </div>
  );
};
export default BigTest;
