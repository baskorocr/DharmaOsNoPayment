import React, { useState, useRef } from "react";
import "../Assets/index.css";
import { useNavigate } from "react-router-dom";
import controlEme from "./controlEme";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import SimpleKeyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

function App() {
  const navigate = useNavigate();
  const customLayout = {
    default: ["1 2 3", "4 5 6", "7 8 9", "0"],
  };
  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const sharedVariable = useSelector((state) => state.sharedVariable);

  const [inputValue, setInputValue] = useState("");

  const keyboard = useRef(); // Reference to the Simple Keyboard instance

  function Auth() {
    const data = {
      plug_type: sharedVariable,
      auth: true,
      user: "user0815",
    };
    axios
      .post(
        process.env.REACT_APP_API_URL +
          "/api/outlets/" +
          sharedVariable +
          "/coap/auth",
        data
      )
      .then((response) => {
        if (response.status === 200) {
          navigate("/powerup");
        }
      })
      .catch((err) => {
        navigate("/error");
        console.log(err);
      });
  }

  const Cancel = () => {
    navigate("/landing");
  };

  const Process = () => {
    console.log(inputValue);
    if (inputValue === "1111") {
      Auth();
      // navigate("/kwhAdmin"); optional production
    } else {
      Swal.fire({
        icon: "error",
        title: "Wrong Password Admin",
        text: "Please call your technical machine",
      });
    }
  };

  const reset = () => {
    if (keyboard.current) {
      setInputValue("");
      keyboard.current.clearInput();
    }
  };

  return (
    <div className="animate__animated animate__fadeIn" id="margin">
      <div className={"margin d-flex justify-content-center mt-4"}>
        <img
          className={"logo"}
          src={require("../Assets/img/logo.png")}
          alt=""
        />
      </div>
      <br />
      <h1 className={"d-flex justify-content-center mt-2"}>
        Insert Code Transaction
      </h1>
      <div className="pt-5 row justify-content-center py-2 gx-1">
        <div className="input text-center">
          <div className="inputS">
            <span className="ps-2 pt-1">
              <i className="bx bxs-lock-alt"></i>
            </span>

            <input
              type="password"
              className="inputUser text-center ps-3 mb-5"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <span>
              <div className="row ">
                <div className="col">
                  <div className="line"></div>
                </div>
                <div className="col">
                  <button className="btn  mt-2 pe-4" onClick={reset}>
                    <h5>clear</h5>
                  </button>
                </div>
              </div>
            </span>
          </div>
          <div className="col SimpleKeyboard py-5">
            <div className="container ">
              <SimpleKeyboard
                layout={customLayout}
                onChange={handleInputChange}
                display={{}}
                keyboardRef={(r) => (keyboard.current = r)}
              />
            </div>
          </div>
          <div className="row">
            <div className="row">
              <div className="col">
                <button className="btn btn-process" onClick={Process}>
                  Process
                </button>
              </div>
              <div className="col">
                <button className="btn btn-cancel" onClick={Cancel}>
                  cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
