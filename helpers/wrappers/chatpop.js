import firebase from "firebase";
import validate from "validate.js";
import { v4 as uuid_v4 } from "uuid";
import { getLinkVerif } from "./chathelpers";

export async function createRoom(room, email, password) {
  let message;
  if (!room || !email || !password) {
    return "Missing Values";
  }
  const passvalue = await validate.single(password, {
    presence: true,
    format: {
      pattern: "[^<>{}()]+",
    },
    length: { minimum: 6 },
  });
  const value = await validate.single(room, {
    presence: true,
    format: {
      pattern: "[^<>{}()]+",
    },
    length: { minimum: 3 },
  });
  if (typeof value !== "undefined" || typeof passvalue !== "undefined") {
    return "Invalid characters or password to short";
  }
  const docref = await firebase
    .firestore()
    .collection("private_chat")
    .doc(room);
  await docref.get().then(async (doc) => {
    if (doc.exists) {
      message =
        "There is a private room on this name,Plase select a different Name!!";
    } else {
      await docref
        .set(
          {
            host: email,
            linkVerif: uuid_v4(),
            password,
          },
          {
            merge: true,
          }
        )
        .then(async () => {
          message = await "Your chat room created password and info sent";
        });
    }
  });

  return message;
}
export async function inviteUser(email, room, userEmail) {
  let message;
  if (!email || !room) {
    return "User Email or Room name Missing";
  }
  if (email === userEmail) {
    return "You don't need to invite yourself";
  }

  const value = await validate.single(room, {
    presence: true,
    format: {
      pattern: "[^<>{}()]+",
    },
    length: { minimum: 3 },
  });
  const emailValue = await validate.single(email, {
    presence: true,
    email: true,
    format: {
      pattern: "[^<>{}()]+",
    },
  });
  if (typeof value !== "undefined" || typeof emailValue !== "undefined") {
    return "Invalid characters";
  }
  const linkVer = await getLinkVerif(room);
  if (!linkVer) {
    return "There is no Chatroom on this name";
  }
  const token = uuid_v4();
  const docRef = firebase.firestore().collection("user_aditional");
  await docRef
    .where("email", "==", email.toLowerCase())
    .limit(1)
    .get()
    .then((doc) => {
      let dt;
      doc.forEach((i) => {
        dt = i;
      });
      return dt;
    })
    .then(async (dt) => {
      if (typeof dt == "undefined") {
        message = await "No Email Found in Eventlinny Database";
        return;
      } else {
        const docR = await firebase
          .firestore()
          .collection("private_chat_users")
          .doc(room);
        await docR
          .get()
          .then((doc) => {
            if (doc.exists) {
              docR.update({
                unverified: firebase.firestore.FieldValue.arrayUnion(email),
                tokens: firebase.firestore.FieldValue.arrayUnion(token),
              });
            } else {
              docR.set(
                {
                  unverified: [email],
                  tokens: [token],
                  verified: [],
                },
                { merge: true }
              );
            }
          })
          .then(async () => {
            const docref = await firebase
              .firestore()
              .collection("user_aditional")
              .where("email", "==", email);
            await docref
              .get()
              .then((doc) => {
                let uid;
                doc.forEach((i) => {
                  uid = i.id;
                });
                return uid;
              })
              .then(async (uid) => {
                const data = {
                  link: `http://localhost:3000/chat/verify?r=${room}&to=${token}&l=${linkVer}&ui=${uid}`,
                  email: email,
                  room: room,
                };

                const verify = firebase.functions().httpsCallable("sendVerif");
                await verify(data).then(() => {
                  message = "Invitation Link Sent!!";
                });
              })
              .catch((err) => {
                console.log(err);
              });

            return;
          });
      }
    });

  return message;
}

export async function createPublic(email, room, userName) {
  let message;
  const id = uuid_v4();
  await firebase
    .firestore()
    .collection("public_chat")
    .doc(id)
    .set({
      category: room,
      host: userName,
      last_user: Date.now(),
      active_users: [],
      email: email,
    })
    .then(() => {
      message = "Room Created ,Thank You!";
    });

  return message;
}
