import React from "react";
import ClientsLogo from "./MainContent/ClientsLogo";
import SearchBoxLeft from "./MainContent/SearchBoxLeft";
import SearchBoxRight from "./MainContent/SearchBoxRight";

const MainContent = () => {
  return (
    <div className="mainContent">
      <h2>
        <span>Récup’ Retard</span>
      </h2>
      <p className="subText">
        En cas de retard, ne passez plus à côté d’une compensation : nous
        facilitons votre demande. En savoir plus
      </p>
      <div className="searchBoxes">
        <SearchBoxLeft></SearchBoxLeft>
        <SearchBoxRight></SearchBoxRight>
      </div>
      <ClientsLogo></ClientsLogo>
    </div>
  );
};

export default MainContent;
