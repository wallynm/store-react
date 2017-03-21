import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/FluxCartApp.react'
import ProductData from './utils/ProductData';
import CartAPI from './utils/CartAPI';
import './index.css';

// Load Mock Product Data into localStorage
ProductData.init();
console.info(CartAPI);
// Load Mock API Call
CartAPI.getProductData();

// Render FluxCartApp Controller View
ReactDOM.render(
  <App />,
  document.getElementById('root')
);