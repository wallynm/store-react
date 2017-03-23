import React, { Component } from 'react';
import Reflux from 'reflux';
import CartStore from '../stores/CartStore';
import ProductStore from '../stores/ProductStore';
import FluxProduct from './FluxProduct.react';
import FluxCart from './FluxCart.react';
import ProductActions from '../actions/ProductActions';
import _ from 'lodash';


// Define main Controller View
export default class FluxCartApp extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [CartStore, ProductStore];
  }


  // Render our child components, passing state via props
  render() {
    if(_.isEmpty(this.state.product))
      return null;

    return (
      <div className="cart">
        <FluxCart products={this.state.products} count={CartStore.cartCount()} total={this.state.cartTotal} visible={this.state.cartVisible} />
        <FluxProduct product={this.state.product} cartitems={this.state.products} selected={this.state.selected} />
      </div>
    );
  }
}