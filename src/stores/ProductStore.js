import AppDispatcher from '../dispatcher/AppDispatcher';
import CartConstants from '../constants/CartConstants';
import EventEmitter from 'events';
import _ from 'underscore';

// Extend ProductStore with EventEmitter to add eventing capabilities
class ProductStore extends EventEmitter {
  constructor() {
    super();
    let self = this;
    this._product = {}; 
    this._selected = null;

    // Register callback with AppDispatcher
    AppDispatcher.register((payload) => {
      var action = payload.action;
      var text;

      switch(action.actionType) {

        // Respond to RECEIVE_DATA action
        case CartConstants.RECEIVE_DATA:
          self._loadProductData(action.data);
          break;

        // Respond to SELECT_PRODUCT action
        case CartConstants.SELECT_PRODUCT:
          self._setSelected(action.data);
          break;

        default:
          return true;
      }

      // If action was responded to, emit change event
      self.emitChange();

      return true;
    });
  }

  _loadProductData(data){
    this._product = data[0];
    this._selected = data[0].variants[0];
  }

  _setSelected(index){
    this._selected = this._product.variants[index];
  }

  // Return Product data
  getProduct() {
    return this._product;
  }

  // Return selected Product
  getSelected(){
    return this._selected;
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
export default new ProductStore();