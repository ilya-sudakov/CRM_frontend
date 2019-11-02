import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.scss';
import App from '../src/App.js';

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>,document.getElementById("root"));
