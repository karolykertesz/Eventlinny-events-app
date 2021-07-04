import firebase from "firebase";
import validate from "validate.js";
import { v4 as uuid_v4 } from "uuid";

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
  console.log(message, "hhhh");
  return message;
}

export async function createPublic(email, room, userName) {
  let message;
  if (!room) {
    return "Room name cannot be empty";
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
  const docref = firebase.firestore().collection("public_chat").doc(room);
  await docref.get().then(async (doc) => {
    if (doc.exists) {
      message = "Sorry ,There is a chat room on this name!!";
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
