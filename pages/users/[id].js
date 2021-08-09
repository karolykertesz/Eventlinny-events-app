import { getUserIds, getUserEvents, getUserInfo } from "../../data";
import classes from "../../components/UI/ui-modules/user.module.css";
import UserCard from "../../components/usercard";
import { useRedirect } from "../../helpers/validatehelp";
const User = (props) => {
  useRedirect();
  const { user, userEvents } = props;
  return (
    <div className={classes.top}>
      <div className={classes.box}>
        <UserCard user={user} events={userEvents} />
      </div>
      <div className={classes.events}>ii</div>
    </div>
  );
};

export default User;

export async function getStaticProps(context) {
  const id = await context.params.id;
  const dd = await getUserInfo(id);
  const events = await getUserEvents(id);

  return {
    props: {
      user: dd,
      userEvents: events,
    },
    revalidate: 30,
  };
}
export async function getStaticPaths() {
  const keys = await getUserIds();
  const paths = keys.map((item) => ({ params: { id: item } }));
  return {
    paths: paths,
    fallback: true,
  };
}
