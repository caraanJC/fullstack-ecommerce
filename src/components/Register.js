import { useState } from 'react';
import axios from 'axios';

import Modal from './Modal';

import '../styles/Register.css';
import { actionCreators } from '../state';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

const Register = (props) => {
  const initialState = {
    username: '',
    password: '',
    confirmPassword: '',
  };
  const [newUser, setNewUser] = useState(initialState);

  const dispatch = useDispatch();
  const { setShowLogin } = bindActionCreators(actionCreators, dispatch);

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitBtnClick = (e) => {
    e.preventDefault();
    if (newUser.password !== newUser.confirmPassword) {
      alert("Password don't match");
    } else {
      axios
        .post('http://localhost:8080/api/users/register', newUser)
        .then((res) => {
          if (!res.data.error) {
            alert(res.data.message);
            props.setShowRegister(false);
            setShowLogin(true);
          } else {
            alert(res.data.error);
          }
        });
    }
  };
  return (
    <Modal>
      <button
        className='modal__close'
        onClick={() => props.setShowRegister(false)}
      >
        X
      </button>
      <form onSubmit={handleSubmitBtnClick} className='register'>
        <h2>Register</h2>
        <p>
          <label htmlFor='registerUsername'>Username: </label>
          <input
            id='registerUsername'
            type='text'
            value={newUser.username}
            onChange={handleInputChange}
            name='username'
            required
          />
        </p>

        <p>
          <label htmlFor='registerPassword'>Password: </label>
          <input
            id='registerPassword'
            type='password'
            value={newUser.password}
            onChange={handleInputChange}
            name='password'
            required
            pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
            title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
          />
        </p>
        <p>
          <label htmlFor='registerConfirmPassword'> Confirm Password: </label>
          <input
            id='registerConfirmPassword'
            type='password'
            value={newUser.confirmPassword}
            onChange={handleInputChange}
            name='confirmPassword'
            required
          />
        </p>
        <input
          type='submit'
          value='Register'
          className='modal__button register__button'
        />
      </form>
    </Modal>
  );
};

export default Register;
