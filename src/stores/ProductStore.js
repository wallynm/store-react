import ProductActions from '../actions/ProductActions';
import Reflux from 'reflux';
import _ from 'underscore';
import ProductData from '../utils/ProductData';


class ProductStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      product: {},
      selected: null
    };
    this.listenables = ProductActions;
    this.onReceiveProduct(ProductData.load());
  }

  onReceiveProduct(data){
    this.setState({
      product: data[0],
      selected: data[0].variants[0]
    });
  }

  onSelectProduct(index){
    this.setState({selected: this.state.product.variants[index]});
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