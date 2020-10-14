import React from "react";
import { useApp } from "../context";

const Modal = () => {
  const { state, dispatch } = useApp();
  const { promoModal } = state.states;
  const { travelers } = state.search;

  // ON CLICK => SHOW MODAL
  const showModal = () => {
    return dispatch({
      type: "PROMO_MODAL",
      payload: { value: !promoModal },
    });
  };

  return (
    <div className={promoModal ? "modal" : "hiddenModal"}>
      <div className="modalBlock">
        <div>
          <h2>Ajouter un code SNCF</h2>
          <button className="cancel" onClick={showModal}>
            Annuler
          </button>
        </div>
        <div>
          <p>Code de réduction</p>
          <input></input>
        </div>
        <div>
          <p className="traveler">Passager</p>
          <select>
            {travelers.map((traveler, index) => {
              return (
                <option key={index}>
                  Passager {index + 1} ({traveler.nameTra})
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <button className="ok" onClick={showModal}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
