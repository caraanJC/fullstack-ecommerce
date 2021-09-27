import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';
import axios from 'axios';
import Modal from './Modal';
import ConfirmModal from './ConfirmModal';
import { useState } from 'react';

const EditUser = () => {
  const [confirmModalStatus, setConfirmModalStatus] = useState({
    open: false,
    title: 'Title',
    message: 'Are you sure?',
    user: null,
    method: null,
  });

  const userToEdit = useSelector((state) => state.userToEdit);

  const dispatch = useDispatch();
  const { clearUserToEdit, setUsers, setUserToEdit } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const handleCloseBtnClick = () => {
    clearUserToEdit();
  };

  const handleSuspendBtnClick = (user) => {
    setConfirmModalStatus({
      open: true,
      title: 'Suspend User',
      message: `Are you sure you want to suspend ${user.username}?`,
      user,
      method: () =>
        axios
          .put(
            `http://fullstack-ecommerce-back.herokuapp.com/api/users/${user._id}/suspend`,
            {
              role: 'suspended',
            },
            {
              headers: { 'auth-token': localStorage.getItem('token') },
            }
          )
          .then((res) => {
            axios
              .get('http://fullstack-ecommerce-back.herokuapp.com/api/users', {
                headers: {
                  'auth-token': localStorage.getItem('token'),
                },
              })
              .then((res) => {
                setUsers(res.data);
                axios
                  .get(
                    `http://fullstack-ecommerce-back.herokuapp.com/api/users/${user._id}/GetOne`,
                    {
                      headers: {
                        'auth-token': localStorage.getItem('token'),
                      },
                    }
                  )
                  .then((res) => {
                    setUserToEdit(res.data);
                  });
              });
          }),
    });
  };

  const handleLiftSuspension = (user) => {
    // eslint-disable-next-line no-restricted-globals
    setConfirmModalStatus({
      open: true,
      title: 'Lift Suspension',
      message: `Are you sure you want to lift the suspension of ${user.username}?`,
      user,
      method: () =>
        axios
          .put(
            `http://fullstack-ecommerce-back.herokuapp.com/api/users/${user._id}/lift`,
            {
              role: 'suspended',
            },
            {
              headers: { 'auth-token': localStorage.getItem('token') },
            }
          )
          .then((res) => {
            axios
              .get('http://fullstack-ecommerce-back.herokuapp.com/api/users', {
                headers: {
                  'auth-token': localStorage.getItem('token'),
                },
              })
              .then((res) => {
                setUsers(res.data);
                axios
                  .get(
                    `http://fullstack-ecommerce-back.herokuapp.com/api/users/${user._id}/GetOne`,
                    {
                      headers: { 'auth-token': localStorage.getItem('token') },
                    }
                  )
                  .then((res) => {
                    setUserToEdit(res.data);
                  });
              });
          }),
    });
  };

  const handleDeleteBtnClick = (user) => {
    setConfirmModalStatus({
      open: true,
      title: 'Delete Account',
      message: `Are you sure you want to delete ${user.username}?`,
      user,
      method: () =>
        axios
          .delete(
            `http://fullstack-ecommerce-back.herokuapp.com/api/users/${user._id}`,
            {
              headers: {
                'auth-token': localStorage.getItem('token'),
              },
            }
          )
          .then((res) => {
            axios
              .get('http://fullstack-ecommerce-back.herokuapp.com/api/users', {
                headers: {
                  'auth-token': localStorage.getItem('token'),
                },
              })
              .then((res) => {
                setUsers(res.data);
                clearUserToEdit();
              });
          }),
    });
  };
  return (
    <>
      <Modal>
        <h2>Edit User</h2>
        <button className='modal__close' onClick={handleCloseBtnClick}>
          X
        </button>

        <p>{userToEdit.username}</p>
        <p>
          Role:{' '}
          {userToEdit.roles?.includes('suspended') ? (
            <span>Suspended</span>
          ) : (
            <>
              {userToEdit.roles.map((role) => (
                <span key={role}>{role}</span>
              ))}
            </>
          )}
        </p>
        {userToEdit.roles?.includes('suspended') ? (
          <button
            className='button success-button'
            onClick={() => handleLiftSuspension(userToEdit)}
          >
            Lift Suspension
          </button>
        ) : (
          <button
            className='button warning-button'
            onClick={() => handleSuspendBtnClick(userToEdit)}
          >
            Suspend
          </button>
        )}

        <button
          className='button danger-button'
          onClick={() => handleDeleteBtnClick(userToEdit)}
        >
          Delete
        </button>
      </Modal>
      <ConfirmModal
        classes={`${confirmModalStatus.open ? 'active' : ''}`}
        setConfirmModalStatus={setConfirmModalStatus}
        confirmModalStatus={confirmModalStatus}
      />
    </>
  );
};

export default EditUser;
