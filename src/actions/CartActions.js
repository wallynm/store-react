import AppDispatcher from '../dispatcher/AppDispatcher';
import CartConstants from '../constants/CartConstants';

// Define actions object
let CartActions = {

  // Receive inital product data
  receiveProduct(data) {
    AppDispatcher.handleAction({
      actionType: CartConstants.RECEIVE_DATA,
      data
    })
  },

  // Set currently selected product variation
  selectProduct(index) {
    AppDispatcher.handleAction({
      actionType: CartConstants.SELECT_PRODUCT,
      data: index
    })
  },

  // Add item to cart
  addToCart(sku, update) {
    console.info('addToCart')
    AppDispatcher.handleAction({
      actionType: CartConstants.CART_ADD,
      sku,
      update
    })
  },

  // Remove item from cart
  removeFromCart(sku) {
    AppDispatcher.handleAction({
      actionType: CartConstants.CART_REMOVE,
      sku
    })
  },

  // Update cart visibility status
  updateCartVisible(cartVisible) {
    AppDispatcher.handleAction({
      actionType: CartConstants.CART_VISIBLE,
      cartVisible
    })
  }
};

export default CartActions;