import CartActions from '../actions/CartActions';
console.info(CartActions);
module.exports = {
  // Load mock product data from localStorage into ProductStore via Action
  getProductData() {
    var data = JSON.parse(localStorage.getItem('product'));
    CartActions.receiveProduct(data);
  }
};