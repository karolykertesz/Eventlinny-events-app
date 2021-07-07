import firebase from "firebase";
import classes from "../../components/UI/ui-modules/notifications.main.module.css";
import {
  getuserbyid,
  fetUserKeys,
} from "../../helpers/notihelpers/getuserbyid";
const UserNotes = ({ single }) => {
  console.log(single, "single");
  return (
    <div className={classes.top}>
      <div className={classes.unreadCont}>
        <ul className={classes.unreadUl}>
          {/* {single && single.unread.map((item) => <li key={item.id}></li>)} */}
        </ul>
      </div>
      <div className={classes.readCont}></div>
    </div>
  );
};

export default UserNotes;

export async function getStaticProps(context) {
  const id = context.params.id;
  let dd = await getuserbyid(id);
  if (!dd) {
    return {
      redirect: {
        destination: "/events/first",
        permanent: false,
      },
    };
  }

  return {
    props: {
      single: dd,
    },
    revalidate: 30,
  };
}
export async function getStaticPaths() {
  const pages = await fetUserKeys();
  const paths = pages.map((item) => ({ params: { id: item.id } }));
  return {
    paths: paths,
    fallback: true,
  };
}
