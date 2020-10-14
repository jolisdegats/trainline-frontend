import React from "react";
import "./css/style.css";
import Header from "./components/NavBar";
import MainContent from "./components/MainContent";
import Banner from "./components/Banner";
import Credits from "./components/Credits";
import CallToAction from "./components/CallToAction";
import Modal from "./components/Modal";

function App() {
  return (
    <div className="App">
      <Modal></Modal>
      <Banner></Banner>
      <div className="mainBackgroundImage">
        <Header></Header>
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
