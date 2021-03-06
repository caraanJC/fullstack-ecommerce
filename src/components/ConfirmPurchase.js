import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal';
import axios from 'axios';
import { actionCreators } from '../state';
import { bindActionCreators } from 'redux';
import { useState } from 'react';

import '../styles/ConfirmPurchase.css';
import { notify } from '../helper';

const ConfirmPurchase = (props) => {
  const currentUser = useSelector((state) => state.currentUser);
  const items = useSelector((state) => state.items);
  const popup = useSelector((state) => state.popup);

  const [lastAddress, setLastAddress] = useState(currentUser.lastAddress);

  const dispatch = useDispatch();
  const { login, setupPopup } = bindActionCreators(actionCreators, dispatch);

  const handleCheckoutBtnClick = (cartItems) => {
    // add to orders
    if (cartItems.length > 0) {
      let completeCartItems = cartItems.map((cartItem) => {
        return {
          ...items?.find((item) => cartItem._id === item._id),
          count: cartItem.count,
        };
      });
      completeCartItems = completeCartItems.map((cartItem) => {
        return {
          name: cartItem.name,
          price: cartItem.price,
          count: cartItem.count,
        };
      });
      axios
        .put(
          `https://fullstack-ecommerce-back.herokuapp.com/api/users/profile/changeLastAddress`,
          {
            lastAddress,
          },
          { headers: { 'auth-token': localStorage.getItem('token') } }
        )
        .then((res) => {
          axios
            .get(
              `https://fullstack-ecommerce-back.herokuapp.com/api/users/currentUser`,
              { headers: { 'auth-token': localStorage.getItem('token') } }
            )
            .then((res) => {
              let resData = res.data;

              delete resData.password;
              delete resData.__v;
              login(resData);
            })
            .then((res) => {
              axios
                .put(
                  `https://fullstack-ecommerce-back.herokuapp.com/api/users/cart/emptyCart`,
                  {},
                  { headers: { 'auth-token': localStorage.getItem('token') } }
                )
                .then((res) => {
                  axios
                    .put(
                      `https://fullstack-ecommerce-back.herokuapp.com/api/users/order/addOrder`,
                      {
                        items: completeCartItems,
                        status: 'Pending',
                        userID: currentUser._id,
                        date: new Date(Date.now()),
                        address: currentUser[currentUser.lastAddress],
                      },
                      {
                        headers: {
                          'auth-token': localStorage.getItem('token'),
                        },
                      }
                    )
                    .then((res) =>
                      axios
                        .get(
                          `https://fullstack-ecommerce-back.herokuapp.com/api/users/currentUser`,
                          {
                            headers: {
                              'auth-token': localStorage.getItem('token'),
                            },
                          }
                        )
                        .then((res) => {
                          let resData = res.data;

                          delete resData.password;
                          delete resData.__v;
                          login(resData);
                          props.setShowConfirmPurchase(false);
                          notify(
                            popup,
                            setupPopup,
                            'Order added successfully',
                            'success'
                          );
                        })
                    );
                });
            });
        });
    }
  };

  const handleLastAddressChange = (e) => {
    setLastAddress(e.target.value);
  };
  return (
    <Modal>
      <div
        className='modal__close'
        onClick={() => props.setShowConfirmPurchase(false)}
      >
        X
      </div>
      {currentUser.cartItems?.length > 0 ? (
        <>
          <h2>Confirm Purchase</h2>
          <div className='confirmPurchase__total'>
            <h3>Total: </h3>
            <span>
              ???
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
            </span>
          </div>
          <p>
            <label htmlFor='addressToUse'>Adress:</label>
            <select
              name='address'
              id='addressToUse'
              value={lastAddress ? lastAddress : 'address1'}
              onChange={handleLastAddressChange}
            >
              {currentUser.address1 && (
                <option value='address1'>{currentUser.address1}</option>
              )}
              {currentUser.address2 && (
                <option value='address2'>{currentUser.address2}</option>
              )}
            </select>
          </p>
        </>
      ) : (
        <h2>Empty Cart</h2>
      )}
      {currentUser.cartItems?.length > 0 ? (
        <button
          className='modal__button'
          onClick={() => handleCheckoutBtnClick(currentUser.cartItems)}
        >
          Confirm
        </button>
      ) : (
        <button
          onClick={() => props.setShowConfirmPurchase(false)}
          className='modal__button'
        >
          Close
        </button>
      )}
    </Modal>
  );
};

export default ConfirmPurchase;
