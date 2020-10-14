import React from "react";

const CallToAction = () => {
  return (
    <div className="containerCTA">
      <img
        src="https://static.trainlinecontent.com/content/WEB/images/home/railcard-banner-graphic.svg"
        alt=""
      />
      <div>
        <h2>Voyagez à prix réduit</h2>
        <p>
          Avec les cartes SNCF Avantage ou Liberté, bénéficiez d'au moins 30 %
          de réduction, y compris sur les Prem's.
        </p>
        <button> Acheter une carte</button>
      </div>
    </div>
  );
};

export default CallToAction;
