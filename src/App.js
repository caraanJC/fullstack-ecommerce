import './App.css';

import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Home from './components/Home';
import ManageUsers from './components/ManageUsers';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './state';
import axios from 'axios';
import UserInfo from './components/UserInfo';
import Orders from './components/Orders';
import Popup from './components/Popup';
import { useHistory } from 'react-router-dom';
import { notify } from './helper';

function App() {
  const currentUser = useSelector((state) => state.currentUser);
  const showLogin = useSelector((state) => state.showLogin);
  const popup = useSelector((state) => state.popup);

  const history = useHistory();
  const dispatch = useDispatch();

  const { setUsers, setItems, setupPopup, setAbleToCheckout } =
    bindActionCreators(actionCreators, dispatch);

  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (
      currentUser.roles?.includes('employee') ||
      currentUser.roles?.includes('manager') ||
      currentUser.roles?.includes('admin')
    ) {
      axios.get('http://localhost:8080/api/users/').then((res) => {
        setUsers(res.data);
      });
    }
    if (
      Object.keys(currentUser).length > 0 &&
      currentUser.roles?.includes('user')
    ) {
      if (
        !currentUser.firstName ||
        !currentUser.lastName ||
        !currentUser.phone ||
        !currentUser.address1
      ) {
        notify(
          popup,
          setupPopup,
          'Please update user info to checkout',
          'warning'
        );
        setAbleToCheckout(false);
        history.push('/profile');
      } else {
        setAbleToCheckout(true);
      }
    }
    // eslint-disable-next-line
  }, [currentUser]);
  useEffect(() => {
    axios.get('http://localhost:8080/api/items').then((res) => {
      setItems(res.data);
    });

    // eslint-disable-next-line
  }, []);

  return (
    <div className='app'>
      <Navbar setShowRegister={setShowRegister} />

      <Route exact path='/'>
        <Home />
      </Route>
      {showLogin && <Login setShowRegister={setShowRegister} />}
      {showRegister && <Register setShowRegister={setShowRegister} />}

      <Route path='/cart'>
        <Cart />
      </Route>

      <Route path='/profile/'>
        <UserInfo />
      </Route>
      <Route path='/manage-users'>
        <ManageUsers />
      </Route>
      <Route path='/orders'>
        <Orders />
      </Route>
      {popup.message && <Popup message={popup.message} type={popup.type} />}
    </div>
  );
}

export default App;
