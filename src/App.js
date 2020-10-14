import React from "react";
import "./css/style.css";
import Header from "./components/NavBar";
import { useApp } from "./context";
import MainContent from "./components/MainContent";
import Banner from "./components/Banner";
import Credits from "./components/Credits";
import CallToAction from "./components/CallToAction";
import SearchBoxPopOver from "./components/MainContent/SearchBoxPopOver";
import Modal from "./components/Modal";

function App() {
  const { state, dispatch } = useApp();

  // ON BLUR => HIDE RIGHT BOX (NOT ON MOBILE)
  const onFocusOut = () => {
    return dispatch({
      type: "FOCUS_BLOCK",
      payload: { value: "" },
    });
  };
  return (
    <div className="App">
      <Modal></Modal>
      <Banner></Banner>

      <div className="mainBackgroundImage">
        <Header></Header>
        {state.states.focusBlock !== "" && (
          <div
            className="transparentDiv"
            onClick={(e) =>
              e.target.className === "transparentDiv" && onFocusOut()
            }
          >
            <SearchBoxPopOver></SearchBoxPopOver>
          </div>
        )}
        <div className="container">
          <MainContent></MainContent>
        </div>
      </div>
      <div className="callToAction">
        <CallToAction></CallToAction>
      </div>
      <Credits></Credits>
    </div>
  );
}

export default App;
