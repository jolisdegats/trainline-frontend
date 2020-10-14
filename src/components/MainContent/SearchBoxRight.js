import React from "react";
import priceTag from "../../img/priceTag.svg";
import fidelity from "../../img/fidelity.svg";
import security from "../../img/security.svg";

function SearchBlockRight() {
  return (
    <div className="searchBoxRight">
      <div className="rightBoxText">
        <div>
          <img src={priceTag} alt="" />
          <div>
            <h3>Trouvez le meilleur prix pour votre trajet</h3>
            <p>
              Comparez et réservez vos billets pour voyager avec SNCF, OUIGO,
              Eurostar et plus de 200 autres transporteurs.{" "}
            </p>
          </div>
        </div>
        <div>
          <img src={fidelity} alt="" />
          <div>
            <h3>Obtenez vos points de fidélité et vos réductions</h3>
            <p>
              Nous acceptons les cartes de réduction et abonnements SNCF et bien
              d'autres encore.
            </p>
          </div>
        </div>
        <div>
          <img src={security} alt="" />
          <div>
            <h3> Payez en toute sécurité</h3>
            <p>
              Nous acceptons PayPal, Apple Pay, Visa, Amex et toutes les cartes
              bancaires internationales.
            </p>
          </div>
        </div>
        <div>
          <div>
            <p className="appStoresText">
              L'app leader en Europe pour voyager en train et en bus
            </p>
            <div className="appStoresLogos">
              <img
                src="https://static.trainlinecontent.com/content/WEB/images/app-stores/fr/app_store.svg"
                alt="Visitez l'app store"
              ></img>
              <img
                src="https://static.trainlinecontent.com/content/WEB/images/app-stores/fr/google_play.svg"
                alt="Visitez Google Pay"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBlockRight;
