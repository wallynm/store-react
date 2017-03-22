import CartActions from '../actions/CartActions';
import Reflux from 'reflux';
import _ from 'underscore';

class CartStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      cartVisible: false,
      products: {}
    }
    this.listenables = CartActions;
  }

  onAddToCart(sku, update){
    let products = this.state.products;
    update.quantity = sku in products ? products[sku].quantity + 1 : 1;
    products[sku] = _.extend({}, products[sku], update)
    this.setState({products});
  }

  onRemoveFromCart(sku) {
    let products = this.state.products;
    delete products[sku];
    this.setState({products});
  }

  onUpdateCartVisible(cartVisible) {
    this.setState({cartVisible});
  }

  // Return # of items in cart
  cartCount() {
    return Object.keys(this.state.products).length;
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
};

export default new CartStore();