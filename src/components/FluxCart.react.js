import React, { Component } from 'react';
import CartActions from '../actions/CartActions';
import _ from 'lodash';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.closeCart = this.closeCart.bind(this);
    this.openCart = this.openCart.bind(this);
    this.removeFromCart = this.removeFromCart .bind(this);
  }
  // Hide cart via Actions
  closeCart(){
    CartActions.updateCartVisible(false);
  }

  // Show cart via Actions
  openCart(){
    CartActions.updateCartVisible(true);
  }

  // Remove item from Cart via Actions
  removeFromCart(sku){
    CartActions.removeFromCart(sku);
    if(this.props.count <= 1)
      CartActions.updateCartVisible(false);
  }

  // Render cart view
  render() {
    let self = this;
    let products = this.props.products;
    return (
      <div>
        <div className={"summary " + (this.props.visible ? 'active' : '')}>
          <button type="button" className="close-cart" onClick={this.closeCart}>×</button>
          <ul>
            {Object.keys(products).map(function(product){
              return (
                <li className="item-summary" key={product}>
                  <h1 className="name">{products[product].name}</h1>
                  <p className="type">{products[product].type} x {products[product].quantity}</p>
                  <p className="price">${(products[product].price * products[product].quantity).toFixed(2)}</p>
                  <button type="button" className="remove-item" onClick={self.removeFromCart.bind(self, product)}>Remove</button>
                </li>
              )
            })}
          </ul>
          <span className="total">Total: ${this.props.total}</span>
        </div>
        <button type="button" className="view-cart" onClick={this.openCart} disabled={this.props.count > 0 ? "" : "disabled"}>View Cart ({this.props.count})</button>
      </div>
    );
  }
};