
// importing components from react-router-dom package
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

  
// import Home component
import Home from "./components/home";
// import About component
import Main from "./components/main";
// import ContactUs component
import ContactUs from "./components/ContactUs";
import Cek from "./components/cekConect";
import Dashboard from "./components/dashCharge"; 
import Error from "./components/error";
import store from './state/store';
import { Provider } from 'react-redux';


function App() {
  return (
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<Main />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/cek" element={<Cek />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </Router>
      </Provider>
    </>
  );
}
  
export default App;