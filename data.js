// import firebase from "./helpers/firebase";
import { db } from "./helpers/firebase";

export const DUMMY_EVENTS = [
  {
    id: "e1",
    title: "Programming for everyone",
    description:
      "Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.",
    location: "Somestreet 25, 12345 San Somewhereo",
    date: "2021-05-12",
    image: "images/coding-event.jpg",
    isFeatured: false,
  },
  {
    id: "e2",
    title: "Networking for introverts",
    description:
      "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
    location: "New Wall Street 5, 98765 New Work",
    date: "2021-05-30",
    image: "images/introvert-event.jpg",
    isFeatured: true,
  },
  {
    id: "e3",
    title: "Networking for extroverts",
    description:
      "You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.",
    location: "My Street 12, 10115 Broke City",
    date: "2022-04-10",
    image: "images/extrovert-event.jpg",
    isFeatured: true,
  },
];

export function getFeaturedEvents() {
  return DUMMY_EVENTS.filter((event) => event.isFeatured);
}

export async function getAllEvents() {
  const allEv = [];
  try {
    const col = await db
      .collection("events")
      .orderBy("year", "asc")
      .get()
      .then((snapshot) => {
        snapshot.forEach((i) => {
          allEv.push({
            id: i.id,
            ...i.data(),
          });
        });
      });
  } catch (err) {
    console.log(err);
  }
  return allEv;
}

export function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  let filteredEvents = DUMMY_EVENTS.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export async function findDate(year, month) {
  const arr = [];
  try {
    const ref = await db
      .collection("events")
      .where("year", "==", year)
      .where("month", "==", month)
      .get()
      .then((snapshot) => {
        snapshot.forEach((i) => {
          arr.push({
            id: i.id,
            ...i.data(),
          });
        });
      });
  } catch (err) {
    throw new err();
  }

  return arr;
}

export const getKeys = async () => {
  const keys = [];
  try {
    const k = await db.collection("events").onSnapshot((snapshot) => {
      const ids = snapshot.docs.forEach((i) => {
        keys.push(i.id);
      });
    });
  } catch (err) {
    console.log(err);
  }
  return keys;
};

export const findById = async (id) => {
  let ren = {};
  try {
    let t = await db
      .collection("events")
      .doc(id)
      .get()
      .then((i) => {
        ren = {
          ...i.data(),
        };
      });
  } catch (err) {
    console.log(err);
  }
  return ren;
};
