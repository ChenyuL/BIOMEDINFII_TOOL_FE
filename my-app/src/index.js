import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppHeader from "./components/AppHeader";
import TriedSearchBox from "./components/TriedSearchBox";
import ClinicalNote from "./components/ClinicalNote";
import Footer from "./components/Footer";

// import Backend from "./db/Backend";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
      <AppHeader/>
      <TriedSearchBox/>
      <ClinicalNote/>
      <hr />
      {/*<Backend/>*/}
      <Footer/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
