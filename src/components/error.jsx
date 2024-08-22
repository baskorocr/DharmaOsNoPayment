import React, { useEffect } from "react";
import "../Assets/index.css";

function App() {
  useEffect(() => {
    const handlePage = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", handlePage, { passive: false });
    return () => {
      window.removeEventListener("wheel", handlePage);
    };
  });

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
        Outlet Not Detected
      </h1>

      <div className={"d-flex justify-content-center divError"}>
        <img
          src={require("../Assets/img/error.png")}
          className={"error"}
          alt=""
        />
      </div>

      <h1 className={"d-flex justify-content-center mt-5 mb-5"}>
        Please check your machine
      </h1>
    </div>
  );
}

export default App;
