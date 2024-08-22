import React, { useEffect } from "react";
import "../Assets/index.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  //handler api
  const sharedVariable = useSelector((state) => state.sharedVariable);

  useEffect(() => {
    fetchData();
    const handlePage = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };
    window.addEventListener("wheel", handlePage, { passive: false });
    const interval = setInterval(fetchData, 1000);
    return () => {
      clearInterval(interval);
      window.removeEventListener("wheel", handlePage);
    };
  }, []);

  function fetchData() {
    if (sharedVariable === "" || sharedVariable === "ac") {
      defaultGetEme();
    } else if (sharedVariable === "ccs") {
      OutletEme();
    }
  }

  function defaultGetEme() {
    const apiUrl = process.env.REACT_APP_API_URL + "/api/system/iostate"; // Assuming this API returns a single product
    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data["io"][49]["value"] === 1) {
          navigate("/home");
        }
      })
      .catch((error) => {
        navigate("/error");
      });
  }

  function OutletEme() {
    const apiUrl =
      process.env.REACT_APP_API_URL +
      "/api/outlets/" +
      sharedVariable +
      "/state"; // Assuming this API returns a single product
    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data["evsestat"] === 1) {
          navigate("/home");
        }
      })
      .catch((error) => {
        navigate("/error");
      });
  }

  return (
    <div className="animate__animated animate__fadeIn top">
      <div className={"margin d-flex justify-content-center mt-4"}>
        <img
          className={"logo"}
          src={require("../Assets/img/logo.png")}
          alt=""
        />
      </div>

      <h1 className={"d-flex justify-content-center mt-5 mb-5"}>
        Turn Left Button
      </h1>

      <div className={"d-flex justify-content-center divError"}>
        <img
          src={require("../Assets/img/error.png")}
          className={"error"}
          alt=""
        />
      </div>

      <h1 className={"d-flex justify-content-center mt-5 mb-5"}>
        To Stop Emergency Mode
      </h1>
    </div>
  );
}

export default App;
