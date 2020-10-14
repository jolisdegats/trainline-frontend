import React, { createContext, useContext, useReducer } from "react";
import { datePickerInit } from "./functions/datePickerInit";

export const AppStateContext = createContext();
export const AppDispatchContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export const useApp = () => {
  return {
    state: useContext(AppStateContext),
    dispatch: useContext(AppDispatchContext),
  };
};

// Date Picker variables
let datePickerVars = datePickerInit();
const {
  year,
  month,
  todayTimestamp,
  monthDetails,
  weekDaysList,
  monthsList,
} = datePickerVars;

// STATE INITIALISATION

export const initialState = {
  search: {
    stationsFrom: "",
    stationsTo: "",
    departureDate: todayTimestamp,
    arrivalDate: "",
    travelers: [
      {
        index: "160246402852442",
        nameTra: "adulte",
        rangeTra: "(26-59)",
        age: "",
        promoCard: [],
      },
      // {
      //   index: "160246402852426",
      //   nameTra: "jeune",
      //   rangeTra: "(0-25)",
      //   age: "",
      //   promoCard: [],
      // },
      // { index: "160246402852498", nameTra: "senior", rangeTra: "(60+)", promoCard: [] },
    ],
    promoCode: [],
  },
  states: {
    stationsFromSelected: "",
    stationsToSelected: "",
    promoModal: false,
    focusBlock: "",
    cities: [],
    stationsFromTemp: "",
    stationsToTemp: "",
    departureDateTemp: "",
    arrivalDateTemp: "",
    travelersTemp: "",
  },
  datePicker: {
    todayTimestamp: todayTimestamp,
    year: year,
    month: month,
    initialYear: year,
    initialMonth: month,
    monthDetails: monthDetails,
    weekDaysList: weekDaysList,
    monthsList: monthsList,
  },
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_STATIONS_FIELDS": {
      const { key, value, selected } = action.payload;
      return {
        ...state,
        search: { ...state.search, [key]: value },
        states: { ...state.states, [selected]: false },
      };
    }
    case "FOCUS_BLOCK": {
      const { value } = action.payload;
      return {
        ...state,
        states: {
          ...state.states,
          focusBlock: value,
        },
      };
    }
    case "TEMP_DATA": {
      const {
        stateToChange,
        stateToCopy,
        keyCopied,
        keyReplaced,
      } = action.payload;
      return {
        ...state,
        [stateToChange]: {
          ...state[stateToChange],
          [keyReplaced]: state[stateToCopy][keyCopied],
        },
      };
    }
    case "PROMO_MODAL": {
      const { value } = action.payload;
      return {
        ...state,
        states: { ...state.states, promoModal: value, focusBlock: "" },
      };
    }
    case "UPDATE_CITIES": {
      const { value } = action.payload;
      return { ...state, states: { ...state.states, cities: value } };
    }
    case "SELECT_FROMSTATION": {
      const { key, value } = action.payload;
      return {
        ...state,
        states: { ...state.states, stationsFromSelected: true },
        search: { ...state.search, [key]: value },
      };
    }
    case "CHANGE_MONTH_YEAR": {
      const { month, year, monthDetails } = action.payload;
      return {
        ...state,
        datePicker: {
          ...state.datePicker,
          month: month,
          year: year,
          monthDetails: monthDetails,
        },
      };
    }
    case "SELECT_DATE": {
      const { key, value } = action.payload;
      return {
        ...state,
        search: {
          ...state.search,
          [key]: value,
        },
      };
    }
    case "TEMP_DATE": {
      const { key, value } = action.payload;
      return {
        ...state,
        states: {
          ...state.states,
          [key]: value,
        },
      };
    }

    case "ADD_TRAVELER": {
      const { value } = action.payload;
      const { travelers } = state.search;

      return {
        ...state,
        search: { ...state.search, travelers: [...travelers, value] },
      };
    }
    case "DELETE_TRAVELER": {
      const { value } = action.payload;
      const { travelers } = state.search;

      let newArr = travelers.filter((elem) => elem.index !== value);

      return {
        ...state,
        search: { ...state.search, travelers: newArr },
      };
    }
    case "UPDATE_TRAVELER": {
      const { index, nameTra, rangeTra, age } = action.payload;
      const { travelers } = state.search;

      let newArr = [...travelers];
      let foundIndex = newArr.find((x) => x.index === index);
      foundIndex.nameTra = nameTra;
      foundIndex.rangeTra = rangeTra;
      foundIndex.age = age;

      return {
        ...state,
        search: { ...state.search, travelers: newArr },
      };
    }
    default:
      throw new Error(`Unhandled action type : ${action.type}`);
  }
};
