import React, { useState, useEffect } from "react";
import "../Assets/index.css";
import { useNavigate } from "react-router-dom";
import { setSharedVariable } from "../state/action";
import axios from "axios";
import { useDispatch } from "react-redux";
import controlEme from "./controlEme";
import { useSelector } from "react-redux";

function App() {
  //use url api in vsecc

  const navigate = useNavigate();

  const handling = () => {
    navigate("/home");
  };

  return (
    <>
      <div className="animate__animated animate__fadeIn " id="margin">
        <div className={" d-flex justify-content-center "}>
          <img
            className={"logo"}
            src={require("../Assets/img/logo.png")}
            alt=""
          />
        </div>
        <button className="margin btn btn-landing" onClick={handling}>
          <div className={"d-flex justify-content-center "}>
            <img
              className={"landingImg"}
              src={require("../Assets/img/landing.png")}
              alt=""
            />
          </div>
          <h1 className={"blinking-text d-flex justify-content-center me-5"}>
            Click in here, for active Charging
          </h1>
        </button>
      </div>
    </>
  );
}

export default App;
