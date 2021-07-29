import { findById, getUserAddIds } from "../../data";
import classes from "../../components/UI/ui-modules/archiveitem.module.css";
import ArchiveOneItem from "../../components/archiveOneItem";
import { useRedirect } from "../../helpers/validatehelp";
import Archiveimages from "../../components/achiveImages";

const archiveItem = ({ items }) => {
  useRedirect();
  return (
    <div className={classes.coverGrid}>
      {items && (
        <>
          <div className={classes.first}>
            <ArchiveOneItem items={items} length={items.length} />
          </div>
          <div className={classes.first}>
            <Archiveimages archive={items.archive_photos} />
          </div>
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
    fallback: "blocking",
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
  return {
    props: {
      items: allEv,
    },
  };
}
