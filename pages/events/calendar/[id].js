import react, { useEffect, useState, Fragment } from "react";
import { PiBig, Cover, Pi } from "../../../components/UI/styledindex";
import { useAuth } from "../../../components/Layout/UserContext";
import { getKeys, getUserEvents } from "../../../data";
import EventList from "../../../components/EventList";
import LogisticsItem from "../../../components/event-detail/logistics-item";
import Plus from "../../../components/UI/icons/plus";
import Reactmodal from "../../../components/UI/reactbootstrap/modal";
import { useRouter } from "next/router";

const UserEvents = ({ single }) => {
  const router = useRouter();
  const user = useAuth().user;
  const name = user && user.name;
  const id = user && user.uid;
  const [showmodal, setShowModal] = useState(false);
  const userAddEvents = () => {
    return new Promise((resolve, reject) => {
      resolve(setShowModal(false));
    }).then(() => {
      return router.push(`/userpage/edit/createEvent/${id}`);
    });
  };

  return (
    <Cover>
      <PiBig>The Events You created {name}</PiBig>
      <Pi>
        {single && single.length
          ? `The number of Events You created ${single.length}`
          : ""}
      </Pi>
      {single && single.length > 0 ? (
        <EventList items={single} />
      ) : (
        <Fragment>
          <span
            onClick={() => setShowModal(true)}
            style={{ margin: "200px auto", cursor: "pointer" }}
          >
            <LogisticsItem icon={Plus}>
              <p style={{ color: "burlywood" }}>
                You have No events ,Create one!
              </p>
            </LogisticsItem>
          </span>

          <Reactmodal
            onHide={() => setShowModal(false)}
            add={() => userAddEvents()}
            show={showmodal}
            text={"Please Click OK to Add event"}
          />
        </Fragment>
      )}
    </Cover>
  );
};

export default UserEvents;

export async function getStaticProps(context) {
  const id = context.params.id;
  const data = await getUserEvents(id);
  if (data && data.length !== 0) {
    return {
      props: {
        single: data,
      },
      revalidate: 30,
    };
  } else {
    return {
      props: {
        single: [],
      },
    };
  }
}
export async function getStaticPaths() {
  const events = await getKeys();
  const paths = events.map((item) => ({ params: { id: item.id } }));
  return {
    paths: paths,
    fallback: true,
  };
}
