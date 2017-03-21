import AppDispatcher from '../dispatcher/AppDispatcher';
import CartConstants from '../constants/CartConstants';
import EventEmitter from 'events';
import _ from 'underscore';

class CartStore extends EventEmitter {
  constructor() {
    super();
    const self = this;
    self._products = {};
    self._cartVisible = false;

    AppDispatcher.register(function(payload) {
      var action = payload.action;
      var text;

      console.info(payload.action);

      switch(action.actionType) {
        case CartConstants.CART_ADD:
          self._add(action.sku, action.update);
          break;
        case CartConstants.CART_VISIBLE:
          self._setCartVisible(action.cartVisible);
          break;
        case CartConstants.CART_REMOVE:
          self._removeItem(action.sku);
          break;
        default:
          return true;
      }

      self.emitChange();
      return true;
    });
  }

  // Add product to cart
  _add(sku, update) {
    update.quantity = sku in this._products ? this._products[sku].quantity + 1 : 1;
    this._products[sku] = _.extend({}, this._products[sku], update)
  }

  // Set cart visibility
  _setCartVisible(cartVisible) {
    this._cartVisible = cartVisible;
  }

  // Remove item from cart
  _removeItem(sku) {
    delete this._products[sku];
  }

  // Return cart items
  getCartItems() {
    return this._products;
  }

  // Return # of items in cart
  getCartCount() {
    return Object.keys(this._products).length;
  }

  // Return cart cost total
  getCartTotal() {
    var total = 0;
    for(let product in this._products){
      if(this._products.hasOwnProperty(product)){
        total += this._products[product].price * this._products[product].quantity;
      }
    }
    return total.toFixed(2);
  }

  // Return cart visibility state
  getCartVisible() {
    return this._cartVisible;
  }

  // Emit Change event
  emitChange() {
    this.emit('change');
  }

  // Add change listener
  addChangeListener(callback) {
    this.on('change', callback);
  }

  // Remove change listener
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }
};

export default new CartStore();