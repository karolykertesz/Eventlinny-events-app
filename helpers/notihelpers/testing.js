import firebase from "firebase";
const db = firebase.firestore();
export const addedFunc = async () => {
  const arr = ["carlo3030@hotmail.hu", "kertesz.karoly@yahoo.com"];
  const userRef = db.collection("user_aditional");
  try {
    const promises = arr.map((item) =>
      userRef.where("email", "==", item).get()
    );
    return Promise.all(promises).then((docs) => {
      docs.forEach((el) => {
        el.forEach(async (i) => {
          const id = i.id;
          await db
            .collection("notifications")
            .doc(id)
            .get()
            .then((doc) => {
              if (doc.exists) {
                return db
                  .collection(notifications)
                  .doc(id)
                  .update({
                    unread: admin.firestore.FieldValue.arrayUnion({
                      id: Date.now().toString(),
                      created_at: Date.now(),
                      text: `New Eventlinny event has been added from the category : ${selectedcategory}`,
                    }),
                  });
              } else {
                return db
                  .collection("notifications")
                  .doc(id)
                  .set({
                    unread: [
                      {
                        id: Date.now().toString(),
                        created_at: Date.now(),
                        text: `New Eventlinny event has been added from the category : ${selectedcategory}`,
                      },
                    ],
                  });
              }
            });
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
};
