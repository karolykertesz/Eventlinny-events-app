import React, { useState, useCallback, useEffect } from "react";
import { getUserIds, getUserEvents, getUserInfo } from "../../data";
import classes from "../../components/UI/ui-modules/user.module.css";
import UserCard from "../../components/usercard";
import { useRedirect } from "../../helpers/validatehelp";
import UserEventcard from "../../components/UI/usereventcard";
const User = (props) => {
  useRedirect();
  const { user, userEvents, id } = props;
  const [s, setSort] = useState();
  const sorting = useCallback(async () => {
    const arr = [];
    const sorted = await userEvents.flatMap((e) => [e.category]);
    await sorted.map((i) => !arr.includes(i) && arr.push(i));
    return setSort(arr);
  }, [setSort]);
  useEffect(() => {
    sorting();
  }, [sorting]);
  return (
    <div className={classes.top}>
      <div className={classes.box}>
        <UserCard user={user} events={userEvents} id={id} />
      </div>
      <div className={classes.events}>
        <p>{user && user.name} added categories</p>
        <div className={classes.grid}>
          {s &&
            s.map((item) => (
              <div key={item}>
                <UserEventcard item={item} />
              </div>
            ))}
        </div>
      </div>
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
      id: context.params.id,
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
