import { Fragment } from "react";

import EventSummary from "../../components/event-detail/event-summary";
import EventLog from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import { getkeys } from "../../data";

const SingleEvent = ({ single }) => {
  if (!single) {
    return <p>No event found</p>;
  }

  return (
    <Fragment>
      <EventSummary title={single.title} />
      <EventLog
        date={single.date}
        address={single.location}
        imageAlt={single.title}
        image={single.image}
      />
      <EventContent>
        <p>{single.description}</p>
      </EventContent>
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const id = context.params.id;
  const data = await fetch(
    `https://next-events-309cd-default-rtdb.firebaseio.com/events.json?orderBy="$key"&equalTo="${id}"`
  );
  const dt = await data.json();
  let oj = {};
  for (let key in dt) {
    oj = {
      ...dt[key],
    };
  }
  return {
    props: {
      single: oj,
    },
  };
}
export async function getStaticPaths() {
  const events = await getkeys();
  const paths = events.map((item) => ({ params: { id: item.id } }));
  return {
    paths: paths,
    fallback: true,
  };
}
export default SingleEvent;
