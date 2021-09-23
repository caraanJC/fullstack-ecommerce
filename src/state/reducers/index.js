import { combineReducers } from 'redux';
import users from './users';
import items from './items';
import orders from './orders';
import currentUser from './currentUser';
import userToEdit from './userToEdit';
import itemToEdit from './itemToEdit';
import showLogin from './showLogin';
import popup from './popup';
import ableToCheckout from './ableToCheckout';

const reducers = combineReducers({
  users,
  items,
  currentUser,
  userToEdit,
  itemToEdit,
  orders,
  showLogin,
  popup,
  ableToCheckout,
});

export default reducers;
