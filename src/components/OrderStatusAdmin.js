import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { compareDate, toNormalTime } from '../helper';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';

import '../styles/OrderStatusAdmin.css';

const OrderStatusAdmin = (props) => {
  const users = useSelector((state) => state.users);
  const orders = useSelector((state) => state.orders);

  const dispatch = useDispatch();
  const { setUsers } = bindActionCreators(actionCreators, dispatch);

  const handleChangeStatus = (order, status) => {
    // order.userID, order._id, status
    axios
      .put(`http://localhost:8080/api/users/${order.userID}/editOrder`, {
        _id: order._id,
        status,
      })
      .then((res) => {
        axios.get('http://localhost:8080/api/users').then((res) => {
          setUsers(res.data);
        });
      });
  };

  const handleCancelOrder = (order) => {
    axios
      .put(`http://localhost:8080/api/users/${order.userID}/cancelOrder`, {
        _id: order._id,
      })
      .then((res) => {
        axios.get('http://localhost:8080/api/users').then((res) => {
          setUsers(res.data);
        });
      });
  };

  return (
    <div className='orderStatusAdmin__wrapper'>
      {orders?.map((userOrder) => (
        <div key={uuidv4()} className='orderStatusAdmin__wrapper'>
          {userOrder
            ?.filter((order) => order.status === props.status)
            ?.sort(compareDate)
            ?.map((order) => (
              <div key={order._id} className='orderStatusAdmin__order'>
                <div className='orderStatusAdmin__details'>
                  <p>
                    <span className='orderStatusAdmin__label'>Username:</span>{' '}
                    {users?.find((user) => user._id === order.userID).username}
                  </p>
                  <p>
                    <span className='orderStatusAdmin__label'>Full Name:</span>{' '}
                    {users?.find((user) => user._id === order.userID).firstName}{' '}
                    {users?.find((user) => user._id === order.userID).lastName}
                  </p>
                  <p>
                    <span className='orderStatusAdmin__label'>Address:</span>{' '}
                    {order.address}
                  </p>

                  <p>
                    <span className='orderStatusAdmin__label'>Status:</span>{' '}
                    {order.status}
                  </p>

                  <p>{toNormalTime(order.date)}</p>
                  <p>
                    <span className='orderStatusAdmin__label'>Orders:</span>
                  </p>
                  {order.items?.map((item) => (
                    <p key={item.name} className='orderStatusAdmin__item'>
                      {item.name} ₱{item.price} x {item.count} = ₱
                      {item.price * item.count}
                    </p>
                  ))}
                  <p>
                    <span className='orderStatusAdmin__label'>Total:</span> ₱
                    {order.items
                      ?.map((item) => item.price * item.count)
                      .reduce((prev, current) => {
                        return prev + current;
                      }, 0)}
                  </p>
                </div>
                <p className='orderStatusAdmin__statusControlBtns'>
                  {order.status === 'Pending' && (
                    <>
                      <button
                        className='button success-button'
                        onClick={() => handleChangeStatus(order, 'Cooking')}
                      >
                        Accept
                      </button>{' '}
                      <button
                        className='button danger-button'
                        onClick={() => handleCancelOrder(order)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {order.status === 'Cooking' && (
                    <button
                      className='button success-button '
                      onClick={() => handleChangeStatus(order, 'Delivered')}
                    >
                      Move to Delivered
                    </button>
                  )}
                </p>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default OrderStatusAdmin;
