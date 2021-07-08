import react, { useState, useEffect, useReducer } from "react";
import { v4 as uuid_v4 } from "uuid";
import { useRouter } from "next/router";
import firebase from "firebase";
import { Layer } from "../../pages/signup";
import classes from "./ui-modules/login.module.css";
import { getcountries } from "../../helpers/axios/getlocaion";
import LocationCity from "../locationCity";
import EventDatePicker from "../eventDatepicker";
import { useAuth } from "../../components/Layout/UserContext";
import { sendEmailWithEvent } from "../../helpers/sendEmailWithEvent";
import Loader from "../UI/loader";
import { TablePopOver } from "../UI/reactbootstrap/popover";

const eventsReducer = (state, action) => {
  switch (action.type) {
    case "field": {
      return {
        ...state,
        [action.fildName]: action.payload,
      };
    }
    case "cancel":
      return {
        state: {
          selectedcategory: "",
          eventLocation: "",
          selectedCountry: "",
          startDay: null,
          endDay: null,
          selectedCity: "",
          decription: null,
        },
      };
  }
};

const Eventadder = ({
  category,
  uid,
  setcicked,
  clicked,
  setCat,
  userName,
}) => {
  const router = useRouter();
  const docId = uuid_v4();
  const cityAdder = (value, name) => {
    return new Promise((resolve, reject) => {
      resolve(
        dispatch({
          type: "field",
          fildName: name,
          payload: value,
        })
      );
    }).then(() => {
      setCityDone(true);
    });
  };
  const [citydone, setCityDone] = useState(false);
  const [complete, setComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useAuth().user;
  const email = user.email;
  const startDate = startDay && startDay;
  const displayname = user.name;
  const initialState = {
    selectedcategory: category,
    eventLocation: null,
    selectedCountry: "",
    startDay: null,
    selectedCity: "",
    description: null,
  };
  const [state, dispatch] = useReducer(eventsReducer, initialState);
  const {
    selectedCountry,
    selectedCity,
    selectedcategory,
    eventLocation,
    startDay,
    description,
  } = state;

  const startToSend = new Date(startDay).getTime();
  const [allcountrie, setAllcounries] = useState();
  const formSubmit = (e, value) => {
    e.preventDefault();
    if (value === false) {
      return new Promise((resolve, reject) => {
        resolve(dispatch({ type: "cancel" }));
      })
        .then(() => {
          setcicked(false);
        })

        .then(() => {
          setCat(null);
        });
    }

    if (
      state.eventLocation !== null &&
      state.startDay !== null &&
      state.endDay !== null &&
      state.description !== null
    ) {
      if (eventLocation === "online") {
        setLoading(true);
        return firebase
          .firestore()
          .collection("user_add_events")
          .doc(docId)
          .set({
            added_by: uid,
            attendies: firebase.firestore.FieldValue.arrayUnion(uid),
            category: selectedcategory.toLowerCase(),
            location: "online",
            starts: firebase.firestore.Timestamp.fromDate(new Date(startDay)),
            premium: false,
            description: description.toLowerCase(),
            created_by: displayname,
            user_email: user.email,
          })
          .then(() => {
            setLoading(false);
            //   });
          })
          .then(() => {
            router.push("/events/first");
          })
          .catch((err) => console.log(err));
      } else if (eventLocation !== "online") {
        const loctString = selectedCity;
        setLoading(true);
        return firebase
          .firestore()
          .collection("user_add_events")
          .doc(docId)
          .set({
            added_by: uid,
            attendies: firebase.firestore.FieldValue.arrayUnion(uid),
            category: selectedcategory.toLowerCase(),
            location: loctString.toLowerCase(),
            location_country: selectedCountry,
            starts: new Date(startDay),
            premium: false,
            description: description.toLowerCase(),
            created_by: displayname,
            user_email: user.email,
          })

          .then(() => setLoading(false))
          .then(() => {
            router.push("/events");
          })
          .catch((err) => console.log(err));
      }
    }
  };

  useEffect(() => {
    let mode = true;
    if (mode && state.eventLocation === "self") {
      return getcountries()
        .then((i) => setAllcounries(i.data))
        .then(() => {
          console.log("done");
        });
    }
    return () => (mode = false);
  }, [state.eventLocation]);
  useEffect(() => {
    let mode = true;
    if (state.eventLocation === "online" && mode) {
      setCityDone(true);
      return () => (mode = false);
    }
  }, [state.eventLocation]);
  if (loading) {
    return <Loader />;
  }
  console.log(selectedcategory.toLowerCase());
  return (
    <Layer>
      <div className={classes.form}>
        {complete && (
          <TablePopOver
            location={selectedCity || "online"}
            category={selectedcategory}
            start={new Date(startDay).toLocaleDateString()}
            description={description}
            country={selectedCountry}
          />
        )}
        <form onSubmit={formSubmit}>
          {category === "create" ? (
            <div className={classes.control}>
              <label htmlFor="firstname">create your category</label>
              <input
                type="text"
                id="cat"
                name="createcat"
                onChange={(e) =>
                  dispatch({
                    type: "field",
                    fildName: "selectedcategory",
                    payload: e.target.value,
                  })
                }
              />
            </div>
          ) : (
            <div className={classes.control}>
              <label htmlFor="category">Your Events category</label>
              <input
                type="text"
                id="category"
                name="category"
                disabled={true}
                value={category}
              />
            </div>
          )}
          <div className={classes.control}>
            <label htmlFor="firstname">Location</label>
            <select
              className={classes.mainselection}
              onChange={(e) =>
                dispatch({
                  type: "field",
                  fildName: "eventLocation",
                  payload: e.target.value,
                })
              }
            >
              <option value="">Select Location</option>
              <option value="online">online</option>
              <option value="self">Add Your location</option>
            </select>
            {state.eventLocation === "self" && (
              <div>
                <select
                  className={classes.mainselection}
                  onChange={(e) =>
                    dispatch({
                      type: "field",
                      fildName: "selectedCountry",
                      payload: e.target.value,
                    })
                  }
                >
                  {allcountrie &&
                    allcountrie.map((item) => (
                      <option key={item.id} value={item.iso2}>
                        {item.name}
                      </option>
                    ))}
                </select>
                {state.selectedCountry && (
                  <LocationCity
                    countrycode={state.selectedCountry}
                    setSelectedCity={cityAdder}
                  />
                )}
              </div>
            )}
            {citydone === true && (
              <div>
                <EventDatePicker
                  addDate={dispatch}
                  formSubmit={formSubmit}
                  location={eventLocation}
                  category={selectedcategory}
                  setComplete={setComplete}
                />
              </div>
            )}
          </div>
        </form>
      </div>
    </Layer>
  );
};

export default Eventadder;
