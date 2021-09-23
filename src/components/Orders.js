import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../state';
import { bindActionCreators } from 'redux';
import { useEffect, useState } from 'react';

import OrderStatusUser from './OrderStatusUser';
import OrderStatusAdmin from './OrderStatusAdmin';

import '../styles/Orders.css';

const Orders = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const users = useSelector((state) => state.users);

  const [orderStatus, setOrderStatus] = useState('Pending');

  const dispatch = useDispatch();
  const { login, setUsers, setOrders } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const handleRefreshBtnClick = () => {
    if (currentUser.roles?.includes('user')) {
      axios
        .get(`http://localhost:8080/api/users/${currentUser._id}`)
        .then((res) => {
          let resData = res.data;
          delete resData.password;
          delete resData.__v;
          login(resData);
        });
    } else if (
      currentUser.roles?.includes('employee') ||
      currentUser.roles?.includes('manager') ||
      currentUser.roles?.includes('admin')
    ) {
      axios.get('http://localhost:8080/api/users/').then((res) => {
        setUsers(res.data);
      });
    }
  };

  useEffect(() => {
    if (
      currentUser.roles?.includes('admin') ||
      currentUser.roles?.includes('employee') ||
      currentUser.roles?.includes('manager')
    ) {
      setOrders(
        users
          ?.filter((user) => user.roles?.includes('user'))
          ?.filter((user) => user.orders?.length > 0)
          ?.map((user) => user.orders)
      );
    }

    //eslint-disable-next-line
  }, [users]);

  return (
    <>
      {Object.keys(currentUser).length > 0 ? (
        <div className='orders'>
          <h2>Orders</h2>
          <div className='orders__control'>
            <select
              className='orders__filter'
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
            >
              <option value='Pending'>Pending</option>
              <option value='Cooking'>Cooking</option>
              <option value='Delivered'>Delivered</option>
            </select>
            <button className='orders__refresh' onClick={handleRefreshBtnClick}>
              🔄
            </button>
          </div>
          <div className='orders__items'>
            {currentUser.roles?.includes('user') && (
              <OrderStatusUser status={orderStatus} />
            )}
            {(currentUser.roles?.includes('employee') ||
              currentUser.roles?.includes('manager') ||
              currentUser.roles?.includes('admin')) && (
              <OrderStatusAdmin status={orderStatus} />
            )}
          </div>
        </div>
      ) : (
        <h2>You are not logged in</h2>
      )}
    </>
  );
};

export default Orders;
