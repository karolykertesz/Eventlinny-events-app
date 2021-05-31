import react, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import { useRouter } from "next/router";
import firebase from "firebase";
import { Layer, ForMButton, Error, Pi } from "../../pages/signup";
import classes from "./ui-modules/login.module.css";
import { getcountries } from "../../helpers/axios/getlocaion";
import LocationCity from "../locationCity";
import EventDatePicker from "../eventDatepicker";
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

const Eventadder = ({ category, uid, setcicked, clicked, setCat }) => {
  const router = useRouter();
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
  const initialState = {
    selectedcategory: category === "create" ? "" : category,
    eventLocation: null,
    selectedCountry: "",
    startDay: null,
    endDay: null,
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
    endDay,
    description,
  } = state;

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
        return firebase
          .firestore()
          .collection("user_add_events")
          .doc()
          .set({
            added_by: uid,
            attendies: firebase.firestore.FieldValue.arrayUnion(uid),
            category: category,
            location: "online",
            starts: firebase.firestore.Timestamp.fromDate(new Date(startDay)),
            ends: firebase.firestore.Timestamp.fromDate(new Date(endDay)),
            premium: false,
            description: description,
          })
          .then(() => {
            router.push("/events/first");
          })
          .catch((err) => console.log(err));
      } else if (eventLocation !== "online") {
        const loctString = selectedCountry + "," + selectedCity;
        return firebase
          .firestore()
          .collection("user_add_events")
          .doc()
          .set({
            added_by: uid,
            attendies: firebase.firestore.FieldValue.arrayUnion(uid),
            category: category,
            location: loctString,
            starts: new Date(startDay),
            ends: new Date(endDay),
            premium: false,
            description: description,
          })
          .then(() => {
            router.push("/events");
          })
          .catch(() => console.log(err));
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

  return (
    <Layer>
      <div className={classes.form}>
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
                <EventDatePicker addDate={dispatch} formSubmit={formSubmit} />
              </div>
            )}
          </div>
        </form>
      </div>
    </Layer>
  );
};

export default Eventadder;
