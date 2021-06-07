let gapi;
if (typeof window !== "undefined") {
  gapi = window.gapi;
  console.log(gapi);
}
const CLIENT_ID = process.env.NEXT_PUBLIC_FIREBASE_CLIENT_ID;
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

const calendar = (id, email, isoStart, isoEnd, description, location) => {
  gapi &&
    gapi.load("client:auth2", () => {
      console.log("created");
      gapi.client.init({
        apiKey: API_KEY,
        clientId:
          "633929560716-bhda6k7iqgrogup445v5too99p86ice2.apps.googleusercontent.com",
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });
      gapi.client.load("calendar", "v3", () => console.log("k"));
      const event = {
        summary: "Google Calendar Event for Eventlinny",
        location: location,
        description: description,
        start: {
          dateTime: isoStart,
        },
        end: {
          dateTime: isoEnd,
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
      var request = gapi.client.calendar.events.insert({
        calendarId: "s9frbt2kma63ljjmouapbp0jgk@group.calendar.google.com",
        resource: event,
      });
      return request.execute(function (event) {
        if (window !== undefined) {
          window.open(
            "https://calendar.google.com/calendar/embed?src=s9frbt2kma63ljjmouapbp0jgk%40group.calendar.google.com&ctz=Europe%2FBudapest"
          );
        }
      });
    });
};
export default calendar;
