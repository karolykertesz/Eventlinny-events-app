import { findById, getUserAddIds, getAttendiesInfo } from "../../data";
import classes from "../../components/UI/ui-modules/archiveitem.module.css";
import ArchiveOneItem from "../../components/archiveOneItem";

const archiveItem = ({ items, users }) => {
  console.log(items);
  return (
    <div className={classes.coverGrid}>
      {items && (
        <>
          <div className={classes.first}>
            <ArchiveOneItem items={items} />
          </div>
          <div className={classes.first}></div>
        </>
      )}
    </div>
  );
};

export default archiveItem;

export async function getStaticPaths() {
  const userIds = await getUserAddIds();
  const paths = userIds.map((item) => ({
    params: {
      id: item,
    },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const id = params.id;
  let userArray;
  const allEv = await findById(id);
  if (!allEv) {
    return {
      notFound: true,
      redirect: {
        destination: "/events/first",
      },
    };
  }
  if (allEv.archive_image_added !== null) {
    const users = await getAttendiesInfo(allEv.archive_image_added);
    return {
      props: {
        items: allEv,
        users,
      },
      revalidate: 1000,
    };
  } else {
    return {
      props: {
        items: allEv,
        users: null,
      },
    };
  }
}
