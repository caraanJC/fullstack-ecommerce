import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { actionCreators } from '../state';
import { bindActionCreators } from 'redux';
import Modal from './Modal';
import { notify } from '../helper';

const EditUserInfo = (props) => {
  const currentUser = useSelector((state) => state.currentUser);
  const popup = useSelector((state) => state.popup);

  const dispatch = useDispatch();
  const { login, setupPopup } = bindActionCreators(actionCreators, dispatch);

  const initialState = { ...currentUser };

  delete initialState.password;
  delete initialState._id;

  const [editUser, setEditUser] = useState(initialState);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    props.setEditProfile(false);

    axios
      .put(
        `http://localhost:8080/api/users/${currentUser._id}/editProfile`,
        editUser
      )
      .then((res) =>
        axios
          .get(`http://localhost:8080/api/users/${currentUser._id}`)
          .then((res) => {
            login(res.data);
            notify(
              popup,
              setupPopup,
              `${res.data.username} info was successfully edited.`,
              'success'
            );
          })
      );
  };

  const handleInputChange = (e) => {
    setEditUser({
      ...editUser,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal>
      <button
        className='modal__close'
        onClick={() => props.setEditProfile(false)}
      >
        X
      </button>
      <form onSubmit={handleSubmitForm}>
        <h2>Edit Info</h2>
        <p>
          <label htmlFor='editUserInfoEmail'>Email: </label>
          <input
            id='editUserInfoEmail'
            type='email'
            value={editUser.email}
            onChange={handleInputChange}
            name='email'
          />
        </p>
        <p>
          <label htmlFor='editUserInfoFirstName'>First Name: </label>
          <input
            id='editUserInfoFirstName'
            type='text'
            value={editUser.firstName}
            onChange={handleInputChange}
            name='firstName'
          />
        </p>
        <p>
          <label htmlFor='editUserInfoLastName'>Last Name: </label>
          <input
            id='editUserInfoLastName'
            type='text'
            value={editUser.lastName}
            onChange={handleInputChange}
            name='lastName'
          />
        </p>
        <p>
          <label htmlFor='editUserInfoFb'>Facebook Name: </label>
          <input
            id='editUserInfoFb'
            type='text'
            value={editUser.fb}
            onChange={handleInputChange}
            name='fb'
            placeholder='Facebook URL'
          />
        </p>
        <p>
          <label htmlFor='editUserInfoPhone'>Phone Number: </label>
          <input
            id='editUserInfoPhone'
            type='tel'
            value={editUser.phone}
            onChange={handleInputChange}
            name='phone'
            pattern='[0-9]{11}'
            placeholder='11 digit number'
          />
        </p>
        <p>
          <label htmlFor='editUserInfoPhone'>Address 1: </label>
          <input
            type='text'
            value={editUser.address1}
            onChange={handleInputChange}
            required
            name='address1'
          />
        </p>
        <p>
          <label htmlFor='editUserInfoPhone'>Address 2: </label>
          <input
            type='text'
            value={editUser.address2}
            onChange={handleInputChange}
            required
            name='address2'
          />
        </p>
        <input type='submit' value='Save' className='modal__button' />
      </form>
    </Modal>
  );
};

export default EditUserInfo;
