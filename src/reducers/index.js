import {combineReducers} from 'redux';
import {books} from './book';
import {cart} from './cart';

export default combineReducers({
  books:books,
  cart:cart
});
