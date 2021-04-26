import { Fragment } from "react";
import Head from "next/head";
import EventSummary from "../../components/event-detail/event-summary";
import EventLog from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import { getKeys, findById } from "../../data";


const SingleEvent = ({ single }) => {
  if (!single) {
    return <p className="center">Loading....</p>;
    // Needs to optimize
  }

  return (
    <Fragment>
      <Head>
        <title>{single.title}</title>
        <meta name="description" content="single next event" />
      </Head>
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
