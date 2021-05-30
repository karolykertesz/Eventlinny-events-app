import React, { useEffect } from "react";
import { useRouter } from "next/router";
import firebase from "firebase";
import EventItem from "../../../components/EventItem";
import { List } from "../../../components/UI/styledComponents";
import { useRedirect } from "../../../helpers/validatehelp";
const Userinfo = ({ message }) => {
  useRedirect();
  const router = useRouter();
  const query = router.query;
  return (
    <div>
      <ul>
        {message &&
          message.map((item, indx) => (
            <li key={indx}>
              <List>
                <EventItem
                  key={indx}
                  id={item.id}
                  start={item.start}
                  end={item.end}
                  location={item.location}
                  category={item.category}
                />
              </List>
            </li>
          ))}
      </ul>
    </div>
  );
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: ["1", "2"] } }],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const eventtype = context.params.slug;
  const uid = eventtype[1];
  if (!uid) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  if (eventtype[0] === "ownevents") {
    const dataref = firebase.firestore().collection("user_add_events");
    const t = async () => {
      return dataref
        .where("added_by", "==", uid)
        .get()
        .then((snapshot) => {
          let arr = [];
          snapshot.forEach((item) => {
            arr.push({
              id: item.id,
              start: item.data().starts.toMillis(),
              end: item.data().ends.toMillis(),
              category: item.data().category,
              added_by: item.data().added_by,
              location: item.data().location,
              attendies: item.data().attendies,
              premium: item.data().premium,
            });
          });
          return arr;
        });
    };
    const value = await t();
    if (!value) {
      return {
        notFound: true,
        redirect: {
          destination: "/login",
        },
      };
    }

    return {
      props: { message: value },
    };
  }
}
export default Userinfo;
