import { getEventById } from "../../data";
import { Fragment } from "react";
import { useRouter } from "next/router";
import EventSummary from "../../components/event-detail/event-summary";
import EventLog from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

const SingleEvent = () => {
  const router = useRouter();
  const id = router.query.id;
  const single = getEventById(id);
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

export default SingleEvent;
