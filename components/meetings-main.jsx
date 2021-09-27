import React, { useState } from "react";
const MainMeetings = (props) => {
  const { id, event, setError, user } = props;
  const [meetingUrl, setmeetingUrl] = useState();
  const meeetingNumber = id;
  const joinMeeting = async () => {
    if (event.data && user) {
      if (!event.data.attendies.includes(user.uid)) {
        return setError("Sorry You didn't signup for this event!!");
      }
      const role = event.data.added_by === user.uid ? 1 : 0;
    }
  };
  return (
    <>
      {/* <Head>
        <link
          type="text/css"
          rel="stylesheet"
          href="../node_modules/@zoomus/websdk/dist/css/bootstrap.css"
        />
        <link
          type="text/css"
          rel="stylesheet"
          href="../node_modules/@zoomus/websdk/dist/css/react-select.css"
        />
      </Head> */}
    </>
  );
};
export default MainMeetings;
