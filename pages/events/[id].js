import Head from "next/head";
import { getKeys, findById } from "../../data";

import { useAuth } from "../../components/Layout/UserContext";
import Loader from "../../components/UI/loader";
import EventComp from "../../components/eventComp";
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
    <>
      <Head>
        <title>{single.category}</title>
        <meta name="description" content="single next event" />
      </Head>
      <EventComp single={single && single} />
    </>
  );
};

export async function getStaticPaths() {
  const events = await getKeys();
  const paths = events.map((item) => ({ params: { id: item.id } }));
  console.log(paths);
  return {
    paths: paths,
    fallback: true,
  };
}
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
export default SingleEvent;
