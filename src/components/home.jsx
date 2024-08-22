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
  const apiUrl = process.env.REACT_APP_API_URL + "/api/webui/data";
  const urlAC = process.env.REACT_APP_API_URL + "/api/outlets/ac/state";
  const urlCCS = process.env.REACT_APP_API_URL + "/api/outlets/ccs/state";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [isButtonDisabled1, setIsButtonDisabled1] = useState(true);
  const [isButtonDisabled2, setIsButtonDisabled2] = useState(true);
  const [isButtonDisabled3, setIsButtonDisabled3] = useState(true);
  const [plug1, setPlug1] = useState([]);
  const [plug2, setPlug2] = useState([]);
  const [plug3, setPlug3] = useState([]);
  const [error, setError] = useState(null);
  const [type, setType] = useState(null);
  const sharedVariable = useSelector((state) => state.sharedVariable);

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 3000);
    const redirectInterval = setTimeout(() => navigate("/landing"), 60000);
    return () => {
      clearInterval(interval);
      clearTimeout(redirectInterval);
    };
  }, []);

  //for data update all oulite
  function fetchData() {
    console.log("Dsad");
    axios
      .get(apiUrl)
      .then((response) => {
        const ccs = response.data["status"]["ccs"];
        const ac = response.data["status"]["ac"];
        const chademo = response.data["status"]["chademo"];
        setIsButtonDisabled1(!ccs);
        setIsButtonDisabled2(!ac);
        setIsButtonDisabled3(!chademo);

        const update = {
          1: response.data["status"]["ccs"],
          2: response.data["status"]["ac"],
          3: response.data["status"]["chademo"],
        };

        setData(update);

        // else if(response.data.length == 3){

        // }
      })
      .catch((error) => {
        //setError(error);
      });

    controlEme(navigate, sharedVariable); //call function file controlEme

    plugCCS();
  }

  //function check for adaptor AC has connect or not
  function plugAC() {
    axios
      .get(urlAC)
      .then((response) => {
        if (response.data["phs"] === 2) {
          setType("ac");
          setPlug2(2);
        } else {
          setPlug2(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //function check for adaptor CCS has connect or not
  function plugCCS() {
    axios
      .get(urlCCS)
      .then((response) => {
        if (response.data["phs"] === 2) {
          setType("ccs");
          setPlug1(1);
        } else {
          setPlug1(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //function for Auth or Proccess starting PowerUp machine
  function Auth() {
    const data = {
      plug_type: type,
      auth: true,
      user: "user0815",
    };
    axios
      .post(
        process.env.REACT_APP_API_URL + "/api/outlets/" + type + "/coap/auth",
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

  if (error) {
    // If there's an error, redirect to the error page
    console.log(error);
    navigate("/error");
  }

  //set handle for onClick event Outlite in menu if adaptor has connected. The system can redirect to auth and not can redirect to cek
  const ClickButton1 = () => {
    if (plug1 === 1) {
      dispatch(setSharedVariable("ccs"));
      navigate("/code");
    } else {
      dispatch(setSharedVariable("ccs"));
      navigate("/cek");
    }
  };
  const ClickButton2 = () => {
    if (plug2 === 2) {
      dispatch(setSharedVariable("ac"));
      navigate("/code");
    } else {
      dispatch(setSharedVariable("ac"));
      navigate("/cek");
    }
  };
  const ClickButton3 = () => {
    if (plug3 === 3) {
      dispatch(setSharedVariable("chademo"));
      navigate("/code");
    } else {
      dispatch(setSharedVariable("chademo"));
      navigate("/cek");
    }
  };

  //css for button home

  const btn = {
    margin: "auto",
    width: "230px",
    height: "660px",
    marginTop: "10%",
    borderRadius: "30px",
    border: "3px solid #ffffff",
    backgroundColor: "#476aff6b",
  };
  const btn1Connect = {
    margin: "auto",
    width: "230px",
    height: "660px",
    marginTop: "10%",
    borderRadius: "30px",
    border: "3px solid #FF9800",
    backgroundColor: "#27E1C1",
  };
  const btn2Connect = {
    margin: "auto",
    width: "230px",
    height: "660px",
    marginTop: "10%",
    borderRadius: "30px",
    border: "3px solid #FF9800",
    backgroundColor: "#27E1C1",
  };
  const btn3Connect = {
    margin: "auto",
    width: "230px",
    height: "660px",
    marginTop: "10%",
    borderRadius: "30px",
    border: "3px solid #FF9800",
    backgroundColor: "#27E1C1",
  };

  const notVailable = {
    margin: "auto",
    width: "230px",
    height: "660px",
    marginTop: "10%",
    borderRadius: "30px",
    border: "3px solid #ffffff",
    backgroundColor: "#000000a2",
  };

  return (
    <div className="animate__animated animate__fadeIn me-5" id="margin">
      <div className={"margin d-flex justify-content-center "} id={"home"}>
        <img
          className={"logo"}
          src={require("../Assets/img/logo.png")}
          alt=""
        />
      </div>

      <h1 className={"margin d-flex justify-content-center mb-2"}>
        CHARGING STATION
      </h1>
      <br />
      <div className={"connector justify-content-center text-center row  mt-5"}>
        <div className={"col-lg-3 mb-3"} hidden={isButtonDisabled1}>
          <button
            className={"ms-5 me-5"}
            style={
              data[1] === true ? (plug1 === 1 ? btn1Connect : btn) : notVailable
            }
            disabled={isButtonDisabled1}
            onClick={ClickButton1}
          >
            <div className={"number btn1"}>1</div>
            <br />
            <h3 className={"text"}>CCS</h3>

            <img
              id="ccsType"
              src={require("../Assets/img/ccs.png")}
              className={"icon"}
              alt=""
            />
            {isButtonDisabled1 ? (
              <p className={"code ccs"}>Not Available</p>
            ) : plug1 === 1 ? (
              <p className={"code ccs"}>EV Connected</p>
            ) : (
              <p className={"code ccs"}>Available</p>
            )}
          </button>
        </div>{" "}
        <div className={"col-lg-3 mb-3"} hidden={isButtonDisabled2}>
          <button
            className={"ms-5 me-5"}
            style={
              data[2] === true ? (plug2 === 2 ? btn2Connect : btn) : notVailable
            }
            disabled={isButtonDisabled2}
            onClick={ClickButton2}
          >
            <div className={"number btn2"}>2</div>
            <br />
            <h3 className={"text"}>AC</h3>
            <img
              id={"ccsAC"}
              src={require("../Assets/img/type2.png")}
              className={"icon2"}
              alt=""
            />
            {isButtonDisabled2 ? (
              <p className={"code type2"}>Not Available</p>
            ) : plug2 === 2 ? (
              <p className={"code type2"}>EV Connected</p>
            ) : (
              <p className={"code type2"}>Available</p>
            )}
          </button>
        </div>
        <div className={"col-lg-4 mb-3"} hidden={isButtonDisabled3}>
          <button
            className={"ms-5 me-5"}
            style={
              data[3] === true ? (plug3 === 3 ? btn3Connect : btn) : notVailable
            }
            disabled={isButtonDisabled3}
            onClick={ClickButton3}
          >
            <div className={"number btn3"}>3</div>
            <br />
            <h3 className={"text"}>CHAdeMO</h3>
            <img
              src={require("../Assets/img/chademo.png")}
              className={"icon3"}
              alt=""
            />

            {isButtonDisabled3 ? (
              <p className={"code chademo"}>Not Available</p>
            ) : (
              <p className={"code chademo"}> Available</p>
            )}
          </button>
        </div>
      </div>
      <div className="row mb-5 mt-5">
        {plug1 === 1 && (
          <h3 className={"d-flex justify-content-center mt-4 ms-3"}>
            {" "}
            CCS Has Been Connected{" "}
          </h3>
        )}
        {plug2 === 2 && (
          <h3 className={"d-flex justify-content-center mt-4 ms-3"}>
            {" "}
            AC Has Been Connected
          </h3>
        )}
      </div>
    </div>
  );
}

export default App;
