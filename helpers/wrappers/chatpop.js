import firebase from "firebase";
import validate from "validate.js";
import { v4 as uuid_v4 } from "uuid";

export async function createRoom(room, email, password) {
  let message;
  if (!room) {
    message = "Room value cannot be empty";
    return;
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
    message = "Invalid charecters or password to short";
    return;
  }
  const docref = await firebase
    .firestore()
    .collection("private_chat")
    .doc(room);
  await docref.get().then(async (doc) => {
    if (doc.exists) {
      message =
        "There is a private room on this name,Plase select a different Name!!";
      return;
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
export async function inviteUser(email, room) {
  let message;
  if (!email || !room) {
    message = "User Email or Room name";
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
    message = "Invalid characters";
    return;
  }
  const docRef = firebase.firestore().collection("user_aditional");
  await docRef
    .where("email", "==", email.trim().toLowerCase())
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
              });
            } else {
              docR.set(
                {
                  unverified: [email],
                },
                { merge: true }
              );
            }
          })
          .then(async () => {
            message = "Invition sent ";
            return;
          });
      }
    });
  return message;
}

export async function createPublic(email, room, userName) {
  let message;
  if (!email || !room) {
    message = "User Email or Room name";
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
    message = await "Invalid characters";
    return;
  }
  const docref = firebase.firestore().collection("public_chat").doc(room);
  await docref.get().then(async (doc) => {
    if (doc.exists) {
      message = await "Sorry ,There is a chat room on this name!!";
      return;
    } else {
      await docref.set(
        {
          host: email,
          userName: userName,
        },
        { merge: true }
      );
      message = await "Room Has Been Created, Thank You";
    }
  });
  return message;
}
