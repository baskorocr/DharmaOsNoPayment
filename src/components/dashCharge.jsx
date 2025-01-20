import React, { useState, useEffect } from "react";
import controlEme from "./controlEme";
import "../Assets/index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import stopCharge from "./stopCharge";

function App() {
  const navigate = useNavigate();
  const [formatedTime, setFormatedTime] = useState("0:00");
  const sharedVariable = useSelector((state) => state.sharedVariable);

  // handler api
  const apiUrl =
    "ws://10.20.27.100/api/outlets/" + sharedVariable + "/statestream";

  const [data, setData] = useState({});

  useEffect(() => {
    const handlePage = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };
    window.addEventListener("wheel", handlePage, { passive: false });

    const socket = new WebSocket(apiUrl);

    // WebSocket event handlers
    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
      const jsonData = JSON.parse(event.data);
      setData(jsonData);

      const minute = Math.floor(jsonData["curr_ses_secs"] / 60);
      const second = jsonData["curr_ses_secs"] % 60;
      const format =
        minute.toString().padStart(2, "0") +
        ":" +
        second.toString().padStart(2, "0");
      setFormatedTime(format);
      if (jsonData["pilot"] === 7) {
        controlEme(navigate, sharedVariable);
      }
      if (jsonData["phs"] === 1) {
        navigate("/home");
      }
    };

    socket.onclose = (event) => {
      if (event.wasClean) {
        console.log(
          `Connection closed cleanly, code=${event.code}, reason=${event.reason}`
        );
      } else {
        console.error("Connection abruptly closed");
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.close();
      window.removeEventListener("wheel", handlePage);
    };
  }, [apiUrl, navigate, sharedVariable]);

  // set handle for onClick event button Stop
  const backHome1 = () => {
    stopCharge(sharedVariable, navigate); // call function file stopCharge
  };

  // Function to determine color based on EVRESSSOC
  const getBarColor = (percent) => {
    if (percent <= 40) return "red";
    if (percent <= 80) return "yellow";
    return "green";
  };

  // CSS styles for progress bar
  const style1 = {
    borderRadius: "20px",
    backgroundColor: "#d9d9d9",
    margin: "50px auto",
    width: "100vh",
  };

  const style2 = {
    borderRadius: "15px",
    height: "50px",
    backgroundColor: getBarColor(data["EVRESSSOC"] || 0),
    width: `${data["EVRESSSOC"] || 0}vh`,
    marginLeft: "-12px",
  };

  return (
    <div className="animate__animated animate__fadeIn " id="top">
      <div className={"margin d-flex justify-content-center mt-4"}>
        <img
          className={"logo"}
          src={require("../Assets/img/logo.png")}
          alt=""
        />
      </div>

      <div className="container">
        <div className="row ">
          <div style={style1} className="container">
            <div style={style2}></div>
          </div>

          <div className="row persen justify-content-center">
            {data["EVRESSSOC"] === undefined ? 0 : data["EVRESSSOC"]}%
          </div>
        </div>
        <div className="row tables mt-5">
          <div className="col-4 ">
            {" "}
            <div className="cols">
              <div>Current</div>
              <div className="data">{data["pc"]} A</div>
            </div>
          </div>
          <div className="col-4">
            <div className="cols">
              <div>Voltage</div>
              <div className="data">{data["pv"]} V</div>
            </div>
          </div>
          <div className="col-4">
            <div className="cols">
              <div>Energy</div>
              <div className="data">
                {data["curr_ses_Wh"] === "NaN"
                  ? 0
                  : parseFloat(data["curr_ses_Wh"] / 1000).toFixed(2)}{" "}
                kWh
              </div>
            </div>
          </div>
        </div>
        <div className="row tables"></div>
        <div className="row tables">
          <div className="col-4">
            <div className="cols">
              <div>Power</div>
              <div className="data">{data["pp"] / 1000} kW</div>
            </div>
          </div>
          <div className="col-4">
            <div className="cols">
              <div>Elapsed Time</div>
              <div className="data">{formatedTime}</div>
            </div>
          </div>
          <div className="col-4">
            <div className="cols">
              <div>Outlet Type</div>
              <div className="data">
                {sharedVariable === "ccs"
                  ? "CCS2 (1)"
                  : sharedVariable === "ac"
                  ? "AC (2)"
                  : "CHADEMO (3)"}
              </div>
            </div>
          </div>
        </div>
        <div className="row btnStop me-3">
          <button
            onClick={backHome1}
            id="btnFinis"
            className=" d-flex-justify-content-center"
          >
            <img
              id="text"
              className="imgStop"
              alt="cek"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAdlJREFUWEftl9FRAzEMRKVOkkoglUAqASqBVEI6IVSyzGbOGSFsWXb4CMz5J5mzz/duJa18Kjc29MZ45P8BAXgSkedF6RdVLf+nxL9aoRWop/uqkFcIwEZENqp65FxLoWWdqOqpp7KdH0pqAKwgVtWlmgIgrn0QkcNI5aWBALyLyL0vbwPJKQta4Hn9pKrbjFIpIAcTPdgCPYrIq4FIQXWBIpglh6wS34zRqcflb6q6j5QKgQAwRAxVGbuSzOVCK2Rm3iv1Y490Ujt1qm/XA6qoeFTVXUulpkJeHVWtrk0C0So+IqXLXATEhKTcYewzQItKdr9mE84CNeM+AGTzsRm2CIgSU2qO7ajj+hxZnLuErWkBERAucW3kT8bo7BoAZc8pIKtQWKoZsGyRRApVW0Xm4bU1AKwfTeWQdeDQOzKQAFJVm/UhHiEYtqGjhHHrX/EhbsK3Kh1+WiXn+GGTHe1lw18VLnco2nwvqzgsL6WhKt2+q3Lm+OFDRyjm0t53fpczrNJirOd7Moe0LtCiUg2qgPGX5+tPEbkzOWeLr6tMt7k2rJ9ewjP1yEiHmJumFHL2T7V6YAzpYTkhDlnFMFAFrtgCQflw5sr5E2lmXAU088DePSvQn1PoCwkNKjSXsc07AAAAAElFTkSuQmCC"
            />
            <text className="btnStop">Stop Charging</text>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
