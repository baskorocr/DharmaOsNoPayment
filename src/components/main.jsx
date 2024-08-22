import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
function Main() {
  const navigate = useNavigate();
  //https://dummyjson.com/products/1
  const apiUrl = process.env.REACT_APP_API_URL + "/"; // Assuming this API returns a single product

  const words = [
    "Warming Up",
    "Stay relaxed and wait a moment",
    "Repeated checking of Machine",
    "Almost Done",
    " ",
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(fetchData, 1000);
    const handlePage = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };
    window.removeEventListener("wheel", handlePage);
    return () => {
      clearInterval(interval);
      window.removeEventListener("wheel", handlePage);
    };
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentWordIndex === 1) {
      // Index 4 (0-based) corresponds to 'Done'
      // Redirect to another page when 'Done' is reached
      //configGet();
    } else if (currentWordIndex === 4) {
      fetchData();
    }
  }, [currentWordIndex, navigate]);

  function fetchData() {
    axios
      .get(apiUrl)
      .then((Response) => {
        if (Response.status === 200) {
          navigate("/landing");
        }
      })
      .catch((error) => {
        console.log(error);
        //navigate("/error");
      });
  }

  return (
    <div className="text-center justify-content-center animate__animated animate__fadeIn mt-5 ">
      <img
        className={"logo mt-5"}
        src={require("../Assets/img/logo.png")}
        alt=""
      />
      <br />
      <br />
      <div className={"loading mt-5"}>
        <PropagateLoader
          color="#ffffff"
          size={"35px"}
          className="loading mb-5 mt-2 loader"
        />
      </div>
      <br />
      <br />
      <br />
      <div className="container mt-lg-5">
        <div className="row text-center">
          <div className="col-15 text-center">
            <h1>{words[currentWordIndex]}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
