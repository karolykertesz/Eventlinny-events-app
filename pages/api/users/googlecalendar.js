const { google } = require("googleapis");
const path = require("path");
const privatekey = require("../../../service/next-events-309cd-firebase-adminsdk-5vizw-f25b60cc6e.json");

const directory =
  "/Users/kerteszkaroly/Documents/Documents/max-next-react/second/service";

const calendar = google.calendar({ version: "v3" });
const calendarId = process.env.NEXT_PUBLC_CALENDAR_ID;
const SCOPES = "https://www.googleapis.com/auth/calendar";
import { formater } from "../../../helpers/calendardateFormater";
let privateKey = process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY;
privateKey = privateKey.replace(/\\n/gm, "\n");
export default async function handler(req, res) {
  const { start, location, description, email } = req.body;
  let jwtClient = new google.auth.JWT(
    privatekey.client_email,
    null,
    privatekey.private_key,
    ["https://www.googleapis.com/auth/calendar"],
    email
  );
  jwtClient.authorize(function (err, tokens) {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("Successfully connected!");
    }
  });
  const { startIso, endIso } = formater(start);

  const addEvents = async (event) => {
    try {
      let response = await calendar.events.insert({
        auth: jwtClient,
        calendarId: calendarId,
        resource: event,
      });
      if (response["status"] == 200 && response["statusText"] === "OK") {
        return res.status(200).json({ m: "Event Created" });
      } else {
        return res.status(500).json({ m: "Something went Wrong!!" });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const event = {
    summary: "Google Calendar Event for Eventlinny",
    location: location,
    description: description,
    start: {
      dateTime: startIso,
      timeZone: "Europe/Berlin",
    },
    end: {
      dateTime: endIso,
      timeZone: "Europe/Berlin",
    },
    recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
    attendees: [{ email: email }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  };
  return addEvents(event)
    .then((re) => {
      console.log(re);
    })
    .catch((err) => console.log(err));
}
