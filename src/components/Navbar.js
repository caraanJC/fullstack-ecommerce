import '../styles/Navbar.css';

import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';

const Navbar = (props) => {
  const currentUser = useSelector((state) => state.currentUser);

  const [showNav, setShowNav] = useState(false);

  const dispatch = useDispatch();

  const { logout, emptyUsers, clearUserToEdit, setShowLogin } =
    bindActionCreators(actionCreators, dispatch);

  const handleNavbarClick = () => {
    setShowNav((prev) => !prev);
  };

  const handleLogout = () => {
    emptyUsers();
    clearUserToEdit();
    logout();
  };

  return (
    <nav className='navbar'>
      <div className='brand-title'>7J's Kitchen</div>
      <button className='toggle-button' onClick={handleNavbarClick}>
        <span className='toggle-button__bar'></span>
        <span className='toggle-button__bar'></span>
        <span className='toggle-button__bar'></span>
      </button>
      <div className={`navbar__links ${showNav ? 'active' : ''}`}>
        <ul>
          <li>
            <NavLink
              activeClassName='current'
              exact
              to='/'
              onClick={() => setShowNav(false)}
            >
              Shop
            </NavLink>
          </li>

          {currentUser.roles?.includes('user') && (
            <li>
              <NavLink
                activeClassName='current'
                to='/cart'
                onClick={() => setShowNav(false)}
              >
                Cart
              </NavLink>
            </li>
          )}
          {currentUser.roles?.length > 0 && (
            <li>
              <NavLink
                activeClassName='current'
                to='/orders'
                onClick={() => setShowNav(false)}
              >
                Orders
              </NavLink>
            </li>
          )}

          {currentUser.roles?.includes('admin') && (
            <li>
              <NavLink
                activeClassName='current'
                to='/manage-users'
                onClick={() => setShowNav(false)}
              >
                Manage Users
              </NavLink>
            </li>
          )}
          {Object.keys(currentUser).length === 0 ? (
            <>
              <li>
                <NavLink
                  to='/'
                  onClick={() => {
                    setShowLogin(true);
                    setShowNav(false);
                  }}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/'
                  onClick={() => {
                    props.setShowRegister(true);
                    setShowNav(false);
                  }}
                >
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  activeClassName='current'
                  to='/profile'
                  onClick={() => setShowNav(false)}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/'
                  onClick={() => {
                    handleLogout();
                    setShowNav(false);
                  }}
                >
                  Logout
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
