import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import firebase from "firebase";
import classes from "../../components/UI/ui-modules/notifications.main.module.css";
import NotiItem from "../../components/UI/notificationItem";
import NotificationModal from "../../components/UI/reactbootstrap/notificationmodal";
import { useRedirect } from "../../helpers/validatehelp";

const UserNotes = () => {
  useRedirect();
  const router = useRouter();
  const id = router.query.id;
  const [singleData, setSingle] = useState();
  const [show, setShow] = useState(false);
  const [noteId, setId] = useState();
  const [category, setcat] = useState();
  const getNotifications = useCallback(async () => {
    const dataref = await firebase
      .firestore()
      .collection("notifications")
      .doc(id);
    await dataref.onSnapshot((snap) => {
      if (snap.exists) {
        setSingle({
          unread: snap.data().unread ? snap.data().unread : "",
          read: snap.data().read ? snap.data().read : "",
        });
      }
    });
  }, [id]);
  useEffect(() => {
    getNotifications();
  }, [getNotifications]);
  const viewModal = (id, cat) => {
    setId(id);
    setcat(cat);
    setShow(true);
  };

  return (
    <div className={classes.mainTop}>
      <NotificationModal
        onHide={() => setShow(false)}
        cat={category}
        id={noteId}
        show={show}
        setShow={setShow}
        single={singleData}
      />
      <p className={classes.click}>click to see or hover to view</p>
      <div className={classes.top}>
        <div className={classes.unreadCont}>
          {singleData && (
            <>
              {singleData.unread !== null && (
                <div className={classes.unreadUl}>
                  {singleData.unread.map((item) => (
                    <div
                      key={item.id}
                      className={classes.btnDiv}
                      onClick={() => viewModal(item.id, "unread")}
                    >
                      <NotiItem item={item} cat="unread" />
                    </div>
                  ))}
                </div>
              )}
              {singleData.read && (
                <div className={classes.unreadUl}>
                  {singleData.read.map((item) => (
                    <div
                      key={item.id}
                      key={item.id}
                      className={classes.btnDiv}
                      onClick={() => viewModal(item.id, "read")}
                    >
                      <NotiItem item={item} cat="read" />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserNotes;

// export async function getStaticProps(context) {
//   const id = context.params.id;
//   let dd = await getuserbyid(id);
//   if (!dd) {
//     return {
//       redirect: {
//         destination: "/events/first",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       single: dd,
//     },
//     revalidate: 30,
//   };
// }
// export async function getStaticPaths() {
//   const pages = await fetUserKeys();
//   const paths = pages.map((item) => ({ params: { id: item.id } }));
//   return {
//     paths: paths,
//     fallback: true,
//   };
// }
