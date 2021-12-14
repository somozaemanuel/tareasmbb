import React, { FC, useEffect } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Routing from "./router/Router";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./index.css";
import store, { persistor } from "./store/store";
import Header from "./components/Header/Header";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import "react-datepicker/dist/react-datepicker.css"
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Header/>
    <br/>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
      <Routing />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
