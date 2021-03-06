import { useState } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';
import Modal from './Modal';

import '../styles/Login.css';
import { notify } from '../helper';

const Login = (props) => {
  const initialState = {
    username: '',
    password: '',
  };
  const [userLogin, setUserLogin] = useState(initialState);

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const popup = useSelector((state) => state.popup);

  const { login, setShowLogin, setupPopup } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const handleInputChange = (e) => {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitBtnClick = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          'https://fullstack-ecommerce-back.herokuapp.com/api/auth/login',
          userLogin
        )
        .then((res) => {
          localStorage.setItem('token', res.data.token);
          let user = res.data.user;
          delete user.password;
          delete user.__v;
          if (user.roles?.includes('suspended')) {
            notify(
              popup,
              setupPopup,
              `${user.username} is suspended`,
              'warning'
            );
          } else {
            login(user);
            notify(
              popup,
              setupPopup,
              `${user.username} successfully logged in`,
              'success'
            );

            setUserLogin(initialState);
            setShowLogin(false);
          }
        });
    } catch (error) {
      notify(popup, setupPopup, `Wrong username or password`, 'danger');
    }
  };

  const handleSuggestionClick = () => {
    setShowLogin(false);
    props.setShowRegister(true);
  };

  return (
    <Modal>
      <button className='modal__close' onClick={() => setShowLogin(false)}>
        X
      </button>
      <form onSubmit={handleSubmitBtnClick} className='login'>
        {Object.keys(currentUser).length === 0 ? (
          <>
            <h2>Login</h2>
            <p>
              <label htmlFor='loginUsername'>Username: </label>
              <input
                type='text'
                value={userLogin.username}
                onChange={handleInputChange}
                name='username'
                required
                id='loginUsername'
              />
            </p>
            <p>
              <label htmlFor='loginPassword'>Password: </label>
              <input
                type='password'
                value={userLogin.password}
                onChange={handleInputChange}
                name='password'
                required
                id='loginPassword'
              />
            </p>

            <input
              type='submit'
              value='Login'
              className='modal__button login__button'
            />
            <small className='login__suggestion'>
              Not a member?{' '}
              <Link to='/' onClick={handleSuggestionClick}>
                Register Now
              </Link>
            </small>
          </>
        ) : (
          <h2>Already Logged In</h2>
        )}
      </form>
    </Modal>
  );
};

export default Login;
