const { google } = require("googleapis");
const privatekey = require("../../../service/serviceAccountKey.json");

import { formater } from "../../../helpers/calendardateFormater";

export default async function handler(req, res) {
  const calendarId = "s9frbt2kma63ljjmouapbp0jgk@group.calendar.google.com";
  const SCOPES = "https://www.googleapis.com/auth/calendar";
  const { start, location, description, email } = req.body;
  let jwtClient = new google.auth.JWT(
    privatekey.client_email,
    null,
    privatekey.private_key,
    SCOPES
  );
  jwtClient.authorize(function (err, tokens) {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("Successfully connected!");
    }
  });
  const calendar = google.calendar({
    version: "v3",
    auth: "AIzaSyDImptQzrpOxgVA5hHGnQa3osfu2T-Q72c",
  });
  const { startIso, endIso } = formater(start);
  const event = {
    summary: "Google Calendar Event for Eventlinny",
    location: location,
    description: description,
    start: {
      dateTime: startIso,
      timeZone: "Europe/Berlin",
    },
    colorId: 1,
    end: {
      dateTime: endIso,
      timeZone: "Europe/Berlin",
    },
    recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
    // attendees: [{ email: email }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  };

  // const addEvents = async (event) => {
  // try {
  //   let response = await calendar.events.insert({
  //     auth: jwtClient,
  //     calendarId: calendarId,
  //     resource: event,
  //   });
  //   if (response["status"] == 200 && response["statusText"] === "OK") {
  //     // console.log("Event Created");
  //     // return res.status(200).json({ m: "Event Created" });
  //   } else {
  //     return res.status(500).json({ m: "Something went Wrong!!" });
  //   }
  // } catch (err) {
  //   console.log(err, "the err");
  // }
  return calendar.freebusy.query(
    {
      resource: {
        timeMin: startIso,
        timeMax: endIso,
        timeZone: "Europe/Berlin",
        items: [{ id: calendarId }],
      },
    },
    (err, response) => {
      if (err) {
        res.status(500).json({ m: "Qury Error", err });
        return;
      }
      console.log(JSON.stringify(response.data));

      return calendar.events.insert(
        {
          // apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
          auth: jwtClient,
          calendarId: calendarId,
          resource: event,
        },
        (err) => {
          if (err) return res.status(500).json({ m: err });

          return res.status(200).json({ m: "Created" });
        }
      );
    }
  );
}

// return addEvents(event)
//   .then((re) => {
//     console.log(re, "respone");
//   })
//   .catch((err) => console.log(err));
// }
