import React from "react";
import { useApp } from "../../context";
import CityList from "./CityList";
import DatePicker from "./DatePicker";
import Travelers from "./Travelers";

const SearchBoxPopOver = () => {
  const { state, dispatch } = useApp();
  const { focusBlock } = state.states;

  const onChange = (e) => {
    const { name, value } = e.target;
    const selected = `${name}Selected`;
    return dispatch({
      type: "UPDATE_STATIONS_FIELDS",
      payload: { key: name, value: value, selected: [selected] },
    });
  };

  const closeBox = () => {
    return dispatch({
      type: "FOCUS_BLOCK",
      payload: { value: "" },
    });
  };

  const cancel = () => {
    return (
      dispatch({
        type: "TEMP_DATA",
        payload: {
          stateToChange: "search",
          stateToCopy: "states",
          keyReplaced: focusBlock,
          keyCopied: focusBlock + "Temp",
        },
      }),
      dispatch({
        type: "FOCUS_BLOCK",
        payload: { value: "" },
      })
    );
  };

  const mobileHeader = () => {
    if (focusBlock === "stationsFrom" || focusBlock === "stationsTo") {
      return (
        <input
          name={focusBlock}
          placeholder={
            focusBlock === "stationsFrom" ? "Gare de départ" : "Gare d'arrivée"
          }
          value={state.search[focusBlock]}
          onChange={onChange}
        />
      );
    } else if (focusBlock === "departureDate") {
      return <p>Date d'aller</p>;
    } else if (focusBlock === "arrivalDate") {
      return <p>Date de retour</p>;
    } else {
      return <p>Passagers</p>;
    }
  };

  const mobileFooter = () => {
    if (focusBlock !== "stationsFrom" && focusBlock !== "stationsTo") {
      return <button onClick={closeBox}>OK</button>;
    }
  };

  return (
    <div className="searchBoxPopOver">
      <div>
        <div className="mobileHeader">
          {mobileHeader()} <div onClick={cancel}>Annuler</div>
        </div>
        {focusBlock === "stationsFrom" || focusBlock === "stationsTo" ? (
          <CityList></CityList>
        ) : focusBlock === "departureDate" || focusBlock === "arrivalDate" ? (
          <DatePicker></DatePicker>
        ) : (
          focusBlock === "travelers" && <Travelers></Travelers>
        )}
      </div>
      <div className="mobileFooter">{mobileFooter()}</div>
    </div>
  );
};

export default SearchBoxPopOver;
