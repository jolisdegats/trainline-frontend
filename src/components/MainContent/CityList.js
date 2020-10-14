import React, { useEffect } from "react";
import { useApp } from "../../context";
import axios from "axios";

const CityList = () => {
  const { state, dispatch } = useApp();
  const { stationsFrom, stationsTo } = state.search;
  const { focusBlock, cities, stationsFromSelected } = state.states;

  useEffect(() => {
    const updateCities = (citiesList) => {
      return dispatch({
        type: "UPDATE_CITIES",
        payload: { value: citiesList },
      });
    };

    const fetchPopularCities = async () => {
      let api;
      stationsFromSelected
        ? (api = `https://api.comparatrip.eu/cities/popular/from/${stationsFrom}/5`)
        : (api = "https://api.comparatrip.eu/cities/popular/5");

      const response = await axios.get(api);

      return updateCities(response.data);
    };

    const fetchAutocompleteCities = async (query) => {
      const response = await axios.get(
        `https://api.comparatrip.eu/cities/autocomplete/?q=${query}`
      );
      return updateCities(response.data);
    };

    state.search[focusBlock] !== ""
      ? fetchAutocompleteCities(state.search[focusBlock])
      : fetchPopularCities();
  }, [
    focusBlock,
    stationsFrom,
    stationsTo,
    state.search,
    dispatch,
    stationsFromSelected,
  ]);

  //   ON CLICK ON ITEM IN THE LIST => SET STATION VALUE
  const selectStation = (name) => {
    let action =
      window.screen.width > 768
        ? focusBlock === "stationsFrom"
          ? "stationsTo"
          : ""
        : "";
    return (
      dispatch({
        type: "SELECT_FROMSTATION",
        payload: { key: focusBlock, value: name },
      }),
      window.screen.width > 768 &&
        focusBlock === "stationsFrom" &&
        document.searchJourney.stationsTo.focus(),
      dispatch({
        type: "FOCUS_BLOCK",
        payload: { value: action },
      })
    );
  };

  return (
    <div className="cities">
      {state.search[focusBlock] === "" && <p className="popular">Populaires</p>}
      {cities.map((city, index) => {
        return (
          <div
            className={(index === 0 ? "firstElem" : "") + " cityList"}
            key={index}
            onClick={() => selectStation(city.unique_name)}
          >
            <p>{city.unique_name}</p>
            <p>{city.gpuid.substring(2, 4)}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CityList;
