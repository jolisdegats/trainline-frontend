import React from "react";
import { useApp } from "../context";
import ClientsLogo from "./MainContent/ClientsLogo";
import SearchBoxLeft from "./MainContent/SearchBoxLeft";
import SearchBoxPopOver from "./MainContent/SearchBoxPopOver";
import SearchBoxRight from "./MainContent/SearchBoxRight";

const MainContent = () => {
  const { state } = useApp();

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
        {state.states.focusBlock !== "" && (
          <SearchBoxPopOver></SearchBoxPopOver>
        )}
      </div>
      <ClientsLogo></ClientsLogo>
    </div>
  );
};

export default MainContent;
