import { Fragment } from "react";
import Head from "next/head";
import EventSummary from "../../components/event-detail/event-summary";
import EventLog from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import { getKeys, findById } from "../../data";
import { PiBig } from "../../components/UI/styledComponents";
import { useAuth } from "../../components/Layout/UserContext";
import Loader from "../../components/UI/loader";

const SingleEvent = ({ single }) => {
  if (!single) {
    return (
      <span className="center">
        <Loader />
      </span>
    );
  }
  const user = useAuth().user;
  return (
    <Fragment>
      <Head>
        <title>{single.category}</title>
        <meta name="description" content="single next event" />
      </Head>
      <EventSummary title={single.category} />
      <EventLog
        date={single.start}
        address={single.location}
        imageAlt={single.category}
        image={`images/${single.category}.jpg`}
        start={single.start}
        addedby={single.added_by}
      />
      <EventContent>
        <PiBig>{single.category}</PiBig>
      </EventContent>
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const id = context.params.id;
  let dd = await findById(id);
  return {
    props: {
      single: dd,
    },
    revalidate: 30,
  };
}
export async function getStaticPaths() {
  const events = await getKeys();
  const paths = events.map((item) => ({ params: { id: item.id } }));
  return {
    paths: paths,
    fallback: true,
  };
}
export default SingleEvent;
