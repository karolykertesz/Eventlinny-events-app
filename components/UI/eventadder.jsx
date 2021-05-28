import react, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useReducer,
} from "react";
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
    case "cancel": {
      return (state = initialState);
    }
  }
};

const Eventadder = ({ category, setlocation }) => {
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
  const initialState = {
    selectedcategory: category === "create" ? "" : category,
    eventLocation: "",
    selectedCountry: "",
    startDay: "",
    endDay: "",
    startHour: "",
    endHour: "",
    selectedCity: "",
  };

  const [state, dispatch] = useReducer(eventsReducer, initialState);
  const {
    selectedCountry,
    selectedcategory,
    eventLocation,
    startHour,
    startDay,
    endHour,
    endDay,
  } = state;
  const [allcountrie, setAllcounries] = useState();
  // const [selectedCountry, setselectedCountry] = useState();
  // const [selectedcity, setSelectedCity] = useState();

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
  // useEffect(() => {
  //   let mode = true;
  //   if (mode === true && state.eventLocation === "online") {
  //     setCityDone(true);
  //     return () => (mode = false);
  //   } else if (mode === true && state.eventLocation === "self") {
  //     setCityDone(false);
  //   }
  // }, [state.eventLocation]);
  return (
    <Layer>
      <div className={classes.form}>
        <form>
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
            {citydone ||
              (state.eventLocation === "online" && (
                <div>
                  <EventDatePicker />
                </div>
              ))}
          </div>
        </form>
      </div>
    </Layer>
  );
};

export default Eventadder;
