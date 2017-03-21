import React, { Component } from 'react';
import CartStore from '../stores/CartStore';
import ProductStore from '../stores/ProductStore';
import FluxProduct from './FluxProduct.react';
import FluxCart from './FluxCart.react';


// Method to retrieve state from Stores
function getCartState() {
  return {
    product: ProductStore.getProduct(),
    selectedProduct: ProductStore.getSelected(),
    cartItems: CartStore.getCartItems(),
    cartCount: CartStore.getCartCount(),
    cartTotal: CartStore.getCartTotal(),
    cartVisible: CartStore.getCartVisible()
  };
}

// Define main Controller View
export default class FluxCartApp extends Component {
  constructor(props) {
    super(props);
    this.state = getCartState();
    this._onChange = this._onChange.bind(this);
  }

  // Add change listeners to stores
  componentDidMount() {
    ProductStore.addChangeListener(this._onChange);
    CartStore.addChangeListener(this._onChange);
  }

  // Remove change listers from stores
  componentWillUnmount() {
    ProductStore.removeChangeListener(this._onChange);
    CartStore.removeChangeListener(this._onChange);
  }

  // Render our child components, passing state via props
  render() {
    return (
      <div className="cart">
        <FluxCart products={this.state.cartItems} count={this.state.cartCount} total={this.state.cartTotal} visible={this.state.cartVisible} />
        <FluxProduct product={this.state.product} cartitems={this.state.cartItems} selected={this.state.selectedProduct} />
      </div>
    );
  }

  // Method to setState based upon Store changes
  _onChange() {
    this.setState(getCartState());
  }
}