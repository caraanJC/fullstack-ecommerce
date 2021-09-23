import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compareName, notify } from '../helper';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';
import { useHistory } from 'react-router-dom';

import '../styles/Cart.css';

import ConfirmPurchase from './ConfirmPurchase';

const Cart = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const items = useSelector((state) => state.items);
  const ableToCheckout = useSelector((state) => state.ableToCheckout);
  const popup = useSelector((state) => state.popup);

  const history = useHistory();

  const dispatch = useDispatch();
  const { login, setupPopup, setAbleToCheckout } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const [showConfirmPurchase, setShowConfirmPurchase] = useState(false);

  const handlePlusBtnClick = (itemID) => {
    axios
      .put(`http://localhost:8080/api/users/${currentUser._id}/increaseCount`, {
        _id: itemID,
        count: 1,
      })
      .then((res) =>
        axios
          .get(`http://localhost:8080/api/users/${currentUser._id}`)
          .then((res) => {
            let resData = res.data;
            delete resData.__v;
            delete resData.password;
            login(resData);
          })
      );
  };

  const handleMinusBtnClick = (itemID) => {
    axios
      .put(`http://localhost:8080/api/users/${currentUser._id}/increaseCount`, {
        _id: itemID,
        count: -1,
      })
      .then((res) =>
        axios
          .get(`http://localhost:8080/api/users/${currentUser._id}`)
          .then((res) => {
            let resData = res.data;
            delete resData.__v;
            delete resData.password;
            let zeroItem = resData.cartItems?.find(
              (cartItem) => cartItem.count === 0
            );

            if (zeroItem) {
              axios.put(
                `http://localhost:8080/api/users/${currentUser._id}/deleteCartItem`,
                {
                  _id: itemID,
                }
              );
              resData.cartItems = resData.cartItems?.filter(
                (cartItem) => cartItem._id !== zeroItem._id
              );
            }
            login(resData);
          })
      );
  };

  const handleDeleteBtnClick = (itemID) => {
    axios
      .put(
        `http://localhost:8080/api/users/${currentUser._id}/deleteCartItem`,
        { _id: itemID }
      )
      .then((res) => {
        axios
          .get(`http://localhost:8080/api/users/${currentUser._id}`)
          .then((res) => {
            let resData = res.data;
            delete resData.password;
            delete resData.__v;

            login(resData);
          });
      });
  };

  useEffect(() => {
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
    return () => {
      currentUser.cartItems?.map((cartItem) => {
        if (items.find((item) => item._id === cartItem._id)) {
          return cartItem;
        } else {
          axios.put(
            `http://localhost:8080/api/users/${currentUser._id}/deleteCartItem`,
            { _id: cartItem._id }
          );

          return cartItem;
        }
      });
    };

    // eslint-disable-next-line
  }, []);
  return (
    <div className='cart'>
      {currentUser.roles?.includes('user') ? (
        <>
          <h2>Cart</h2>
          <div className='cart__items'>
            {currentUser.cartItems
              ?.map((cartItem) => {
                return {
                  ...items?.find((item) => item._id === cartItem._id),
                  count: cartItem?.count,
                };
              })
              ?.filter((cartItem) => cartItem.name !== undefined)
              .sort(compareName)
              ?.map((cartItem) => (
                <div key={cartItem._id} className='cart__item'>
                  <p>{cartItem.name}</p>
                  <img
                    src={cartItem.image}
                    alt={cartItem.name}
                    className='cart__itemImage'
                  />
                  <p>₱{cartItem.price} each</p>
                  <div className='countControl'>
                    <div className='countControl__controls'>
                      <button
                        className='button normal-button warning cart__btn'
                        onClick={() => handleMinusBtnClick(cartItem._id)}
                      >
                        -
                      </button>
                      <p className='countControl__count'>{cartItem.count}</p>
                      <button
                        className='button normal-button success cart__btn'
                        onClick={() => handlePlusBtnClick(cartItem._id)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className='button normal-button cart__deleteBtn cart__btn'
                      onClick={() => handleDeleteBtnClick(cartItem._id)}
                    >
                      x
                    </button>
                  </div>
                  <p>SubTotal: ₱{cartItem.count * cartItem.price}</p>
                  <hr />
                </div>
              ))}
          </div>
          <div>
            <h3>
              Total: ₱
              {currentUser.cartItems
                ?.map((cartItem) => {
                  return {
                    ...items?.find((item) => item._id === cartItem._id),
                    count: cartItem?.count,
                  };
                })
                ?.filter((cartItem) => cartItem.name !== undefined)
                ?.map((cartItem) => cartItem.price * cartItem.count)
                ?.reduce((prev, current) => {
                  return prev + current;
                }, 0)}
            </h3>
            <button
              onClick={() => setShowConfirmPurchase(true)}
              className={`button main-button ${
                ableToCheckout ? '' : 'button__unable'
              }`}
              disabled={!ableToCheckout}
            >
              Checkout
            </button>
          </div>
          {showConfirmPurchase && (
            <ConfirmPurchase setShowConfirmPurchase={setShowConfirmPurchase} />
          )}
        </>
      ) : (
        <h2>You are not a user</h2>
      )}
    </div>
  );
};

export default Cart;
