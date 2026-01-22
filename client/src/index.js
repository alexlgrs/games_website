import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from "./components/HomePage/Home"
import AuthPage from "./components/AuthPage/Auth"
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/auth" element = {<AuthPage />}/>
        <Route path="/home" element = {<Home />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
