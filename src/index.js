import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import FoodProvider from './context/FoodProvider';
import DrinkProvider from './context/DrinkProvider';

ReactDOM.render(
  <BrowserRouter>
    <FoodProvider>
      <DrinkProvider>
        <App />
      </DrinkProvider>
    </FoodProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
