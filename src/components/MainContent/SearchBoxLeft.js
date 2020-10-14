import React from "react";
import { useApp } from "../../context";
import { getMonthDetails, setDate } from "../../functions/datePickerInit";

function SearchBlockLeft() {
  const { state, dispatch } = useApp();

  const {
    stationsFrom,
    stationsTo,
    departureDate,
    arrivalDate,
    travelers,
    promoCode,
  } = state.search;

  const { focusBlock, promoModal } = state.states;

  // SET TRAVELERS LIST
  const setTravelers = (travelers) => {
    const travelerTypeArr = ["adulte", "jeune", "senior"];

    let str = [];

    travelerTypeArr.map((type) => {
      let count = 0;
      travelers.map((traveler) => {
        const { nameTra } = traveler;
        return nameTra === type && (count = count + 1);
      });
      return count > 1
        ? str.push(`${count} ${type}s`)
        : count > 0 && str.push(`${count} ${type}`);
    });

    return str;
  };

  // ON CHANGE ON TEXT FIELDS
  const onChange = (e) => {
    const { name, value } = e.target;
    const selected = `${name}Selected`;
    return dispatch({
      type: "UPDATE_STATIONS_FIELDS",
      payload: { key: name, value: value, selected: [selected] },
    });
  };

  // // ON FOCUS => SHOW RIGHT COLUMN BLOCK
  const onFocus = (e) => {
    const { name } = e.target;
    let date;
    let newMonth;
    let newYear;

    // Show month of focused input if this is a date
    if (name === "departureDate") {
      state.search[name]
        ? (date = new Date(state.search[name]))
        : (date = new Date.now());
      newMonth = date.getMonth();
      newYear = date.getFullYear();
    } else if (name === "arrivalDate") {
      state.search.arrivalDate
        ? (date = new Date(state.search[name]))
        : state.search.departureDate
        ? (date = new Date(state.search.departureDate))
        : (date = new Date.now());
      newMonth = date.getMonth();
      newYear = date.getFullYear();
    }

    return focusBlock === name
      ? onFocusOut() & e.target.blur()
      : (dispatch({
          type: "FOCUS_BLOCK",
          payload: {
            value: name,
            key: focusBlock,
            tempKey: focusBlock + "Temp",
          },
        }),
        dispatch({
          type: "TEMP_DATA",
          payload: {
            stateToChange: "states",
            stateToCopy: "search",
            keyReplaced: name + "Temp",
            keyCopied: name,
          },
        }),
        (name === "departureDate" || name === "arrivalDate") &&
          dispatch({
            type: "CHANGE_MONTH_YEAR",
            payload: {
              month: newMonth,
              year: newYear,
              monthDetails: getMonthDetails(newYear, newMonth),
            },
          }));
  };

  // ON BLUR => HIDE RIGHT BOX (NOT ON MOBILE)
  const onFocusOut = () => {
    return dispatch({
      type: "FOCUS_BLOCK",
      payload: { value: "" },
    });
  };

  // OPEN/CLOSE PROMOCODE MODAL
  const showModal = () => {
    return dispatch({
      type: "PROMO_MODAL",
      payload: { value: !promoModal },
    });
  };

  // SUBMIT FUNCTION
  const searchForTravel = (event) => {
    event.preventDefault();
    console.log(stationsFrom);
  };

  return (
    <div className="searchBoxLeft">
      <form onSubmit={searchForTravel} name="searchJourney">
        <div>
          <div className="inputContainer">
            <div className="spanAndInput">
              <span>Départ</span>
              <input
                name="stationsFrom"
                placeholder="Gare ou ville"
                value={stationsFrom}
                onChange={onChange}
                onFocus={onFocus}
                // onBlur={onFocusOut}
              />
            </div>
            <div className="separationLine"></div>
            <div className="spanAndInput">
              <span>Arrivée</span>
              <input
                name="stationsTo"
                placeholder="Gare ou ville"
                value={stationsTo}
                onChange={onChange}
                onFocus={onFocus}
                // onBlur={onFocusOut}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="inputContainer">
            <div className="spanAndInput clickable">
              <span>Aller</span>
              <input
                name="departureDate"
                value={setDate(departureDate)}
                onClick={onFocus}
                // onBlur={onFocusOut}
                readOnly
              />
            </div>
            <div className="separationLine"></div>
            <div className="spanAndInput clickable">
              {arrivalDate !== "" && <span>Retour</span>}
              <input
                name="arrivalDate"
                placeholder="+ Ajouter retour"
                value={setDate(arrivalDate)}
                onClick={onFocus}
                // onBlur={onFocusOut}
                readOnly
              />
            </div>
          </div>
        </div>
        <div>
          <div className="inputContainer noBottomMargin">
            <div className="spanAndInput clickable">
              <input
                name="travelers"
                value={setTravelers(travelers)}
                onClick={onFocus}
                // onBlur={onFocusOut}
                readOnly
              />
            </div>
          </div>
          <div className="promotions">
            {promoCode.length > 0 ? (
              promoCode.map((promo, index) => {
                return (
                  <div>
                    {promo} <span>X</span>
                  </div>
                );
              })
            ) : (
              <div className="addPromotion" onClick={showModal}>
                + Ajouter un code de réduction
              </div>
            )}
          </div>
        </div>
        <button type="submit" className="submitButton">
          Rechercher
        </button>
      </form>
    </div>
  );
}

export default SearchBlockLeft;
