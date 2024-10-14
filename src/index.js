import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './utils/ErrorBoundary'
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

import { AlertProvider } from "../src/contexts/AlertContext";
// Create a root element with React 18
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
 
  <CookiesProvider>
   
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
        <ErrorBoundary>
          <AlertProvider>
          <App />
          </AlertProvider>
          </ErrorBoundary>
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
   
  </CookiesProvider>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
