import axios from "axios";

const ControlEme = function (navigate, val) {
  if (val === "chademo" || val === "ac" || val == "ccs") {
    OutletEme(navigate, val);
  } else {
    defaultGetEme(navigate);
  }
};

function defaultGetEme(navigate) {
  const apiUrl = process.env.REACT_APP_API_URL + "/api/system/iostate"; // Assuming this API returns a single product
  axios
    .get(apiUrl)
    .then((response) => {
      if (response.data["io"][49]["value"] === 0) {
        navigate("/untwist");
      }
    })
    .catch((error) => {
      // navigate('/error');
    });
}

function OutletEme(navigate, val) {
  const apiUrl =
    process.env.REACT_APP_API_URL + "/api/outlets/" + val + "/state"; // Assuming this API returns a single product
  axios
    .get(apiUrl)
    .then((response) => {
      if (response.data["evsestat"] === 5) {
        stopCharge(val);
        navigate("/untwist");
      }
    })
    .catch((error) => {
      //navigate("/error");
    });
}
function stopCharge(val) {
  axios
    .post(process.env.REACT_APP_API_URL + "/api/outlets/" + val + "/coap/stop")
    .then()
    .catch((err) => {
      console.log(err);
    });
}

export default ControlEme;
