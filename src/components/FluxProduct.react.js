import Reflux from 'reflux';
import React, { Component } from 'react';
import CartStore from '../stores/CartStore';
import ProductActions from '../actions/ProductActions';
import CartActions from '../actions/CartActions';

// Flux product view
export default class FluxCartApp extends Reflux.Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
  }

  // Add item to cart via Actions
  addToCart(event){
    var sku = this.props.selected.sku;
    var update = {
      name: this.props.product.name,
      type: this.props.selected.type,
      price: this.props.selected.price
    }
    CartActions.addToCart(sku, update);
    CartActions.updateCartVisible(true);
  }

  // Select product variation via Actions
  selectVariant(event){
    ProductActions.selectProduct(event.target.value);
  }

  // Render product View
  render() {
    var ats = (this.props.selected.sku in this.props.cartitems) ?
      this.props.selected.inventory - this.props.cartitems[this.props.selected.sku].quantity :
      this.props.selected.inventory;
    return (
      <div className="product">
        <img className="product-image" src={this.props.product.image}/>
        <div className="product-detail">
          <h1 className="name">{this.props.product.name}</h1>
          <p className="description">{this.props.product.description}</p>
          <p className="price">Price: ${this.props.selected.price}</p>
          <select onChange={this.selectVariant}>
            {this.props.product.variants.map(function(variant, index){
              return (
                <option key={index} value={index}>{variant.type}</option>
              )
            })}
          </select>
          <button type="button" onClick={this.addToCart} disabled={ats  > 0 ? '' : 'disabled'}>
            {ats > 0 ? 'Add To Cart' : 'Sold Out'}
          </button>
        </div>
      </div>
    );
  }
};