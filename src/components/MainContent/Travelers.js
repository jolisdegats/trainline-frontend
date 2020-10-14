import React from "react";
import { useApp } from "../../context";

const Travelers = () => {
  const { state, dispatch } = useApp();
  const { travelers } = state.search;

  let ageArr = [];
  for (let i = 0; i <= 25; i++) {
    ageArr.push(i);
  }

  const addTraveler = (nameTra) => {
    const index = String(Date.now()) + Math.floor(Math.random() * 100);
    const traveler = {
      index: index,
      nameTra: nameTra,
      rangeTra:
        nameTra === "jeune"
          ? "(0 - 25)"
          : nameTra === "adulte"
          ? "(26 - 59)"
          : "(60+)",
      age: "",
      promocode: [],
    };
    return dispatch({
      type: "ADD_TRAVELER",
      payload: { value: traveler },
    });
  };

  const changeTraveler = (index, value) => {
    let nameTra = value;
    let rangeTra =
      value === "jeune"
        ? "(0 - 25)"
        : value === "adulte"
        ? "(26 - 59)"
        : "(60+)";
    let age = "";

    return dispatch({
      type: "UPDATE_TRAVELER",
      payload: { index: index, nameTra: nameTra, rangeTra: rangeTra, age: age },
    });
  };

  const changeTravelerAge = (index, value) => {
    let nameTra = "jeune";
    let rangeTra = "(0 - 25)";
    let age = value;
    return dispatch({
      type: "UPDATE_TRAVELER",
      payload: { index: index, nameTra: nameTra, rangeTra: rangeTra, age: age },
    });
  };

  const deleteTraveler = (index) => {
    return dispatch({
      type: "DELETE_TRAVELER",
      payload: { value: index },
    });
  };

  const renderTravelers = () => {
    return (
      <div>
        {travelers.map((traveler, index) => {
          return (
            <div key={index}>
              <div className="traveler">
                {travelers.length > 1 && (
                  <p
                    onClick={() => deleteTraveler(traveler.index)}
                    className="deleteTraveler"
                  >
                    X
                  </p>
                )}
                <select
                  name="travelers"
                  value={traveler.nameTra}
                  onChange={(e) =>
                    changeTraveler(traveler.index, e.target.value)
                  }
                >
                  <option value="jeune">
                    Jeune{" "}
                    {traveler.age === ""
                      ? "(0 - 25)"
                      : "(" +
                        traveler.age +
                        " " +
                        (traveler.age > 1 ? "ans" : "an") +
                        ")"}
                  </option>
                  <option value="adulte">Adulte (26 - 59)</option>
                  <option value="senior">Senior (60+)</option>
                </select>
                {traveler.nameTra === "jeune" && (
                  <select
                    className="ageSelect"
                    value={traveler.age}
                    name="jeuneAge"
                    onChange={(e) =>
                      changeTravelerAge(traveler.index, e.target.value)
                    }
                  >
                    <option value="">Âge</option>
                    {ageArr.map((age, index) => {
                      return (
                        <option name="age" key={index} value={age}>
                          {age}
                        </option>
                      );
                    })}
                  </select>
                )}
              </div>
              {traveler.nameTra === "jeune" && traveler.age === "" ? (
                <p
                  className={
                    (travelers.length > 1 ? "leftMargin " : "") + "ageText"
                  }
                >
                  Indiquez l'âge au moment du voyage Pourquoi ?
                </p>
              ) : (
                <p
                  className={
                    (travelers.length > 1 ? "leftMargin " : "") +
                    "addCardsAndMemberships"
                  }
                >
                  Ajouter cartes et abonnements
                </p>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="travelers">
      {renderTravelers()}
      <p className="addTravelerText">Ajouter un autre passager</p>
      <div className="addTravelerButtons">
        <button onClick={() => addTraveler("jeune")}>
          Jeune
          <br />
          <span>(0 - 25)</span>
        </button>
        <button name="adulte" onClick={() => addTraveler("adulte")}>
          Adulte
          <br />
          <span>(26 - 59)</span>
        </button>
        <button name="senior" onClick={() => addTraveler("senior")}>
          Senior
          <br />
          <span>(60+)</span>
        </button>
      </div>
    </div>
  );
};

export default Travelers;
