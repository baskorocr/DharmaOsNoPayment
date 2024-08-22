import axios from "axios";

function stopCharge(sharedVariable, navigate) {
  axios
    .post(
      process.env.REACT_APP_API_URL +
        "/api/outlets/" +
        sharedVariable +
        "/coap/stop"
    )
    .then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        rebootCharge(navigate);
      }
    })
    .catch((err) => {
      navigate("/error");
      console.log(err);
    });
}

function rebootCharge(navigate) {
  axios
    .post(process.env.REACT_APP_API_URL + "/api/system/reboot")
    .then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        navigate("/landing");
      }
    })
    .catch((err) => {
      navigate("/error");
      console.log(err);
    });
}

export default stopCharge;
