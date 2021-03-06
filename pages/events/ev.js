import { useRouter } from "next/router";
import { Fragment } from "react";
import { findDate } from "../../data";
import EventList from "../../components/EventList.jsx";
import ResultTitle from "../../components/results-title";
import Button from "../../components/UI/Button";
import ErrorAlert from "../../components/UI/error-alert";
import Head from "next/head";
const FilteredEvent = (props) => {
  const router = useRouter();

  const data = router.query.slug;
  if (!data) {
    return <p className="center">Loading...</p>;
  }
  const year = data[0];
  const month = data[1];

  const yearY = parseInt(year);
  const montM = parseInt(month);
  if (props.hasError) {
    return (
      <Fragment>
        <div className="center">
          <ErrorAlert>
            <p>Invalid Values!!!</p>
          </ErrorAlert>
          <Button link="/events">Show all events</Button>
        </div>
      </Fragment>
    );
  }

  if (!props.eventsFiltered || props.eventsFiltered.length < 1) {
    return (
      <Fragment>
        <div className="center">
          <p>No event Found!!!</p>
          <Button link="/events">Show all events</Button>
        </div>
      </Fragment>
    );
  }
  const date = new Date(yearY, montM - 1);
  return (
    <div>
      <>
        <Head>
          <title>selected next event</title>
          <meta
            name="description"
            content={`selected event for ${yearY}/${montM}`}
          />
        </Head>
        <ResultTitle date={date} />
        <EventList items={props.eventsFiltered} />
      </>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const data = params.slug;
  const year = data[0];
  const month = data[1];

  const yearY = parseInt(year);
  const montM = parseInt(month);
  if (
    isNaN(yearY) ||
    isNaN(montM) ||
    yearY < 2021 ||
    yearY > 2030 ||
    montM > 12 ||
    montM < 1
  ) {
    return {
      props: {
        hasError: true,
      },
    };
  }
  const eventsFiltered = await findDate(yearY, montM);
  return {
    props: {
      eventsFiltered,
    },
  };
}

export default FilteredEvent;
