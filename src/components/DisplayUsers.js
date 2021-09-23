import EditUser from './EditUser';

import { compareUsername } from '../helper';

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';

import '../styles/DisplayUsers.css';

const DisplayUsers = (props) => {
  const users = useSelector((state) => state.users);
  const userToEdit = useSelector((state) => state.userToEdit);

  const dispatch = useDispatch();

  const { setUserToEdit } = bindActionCreators(actionCreators, dispatch);

  const handleEditBtnClick = (user) => {
    setUserToEdit(user);
  };
  return (
    <div className='displayUsers'>
      {users
        ?.filter((user) => user.username !== 'admin')
        .filter(
          (user) => props.role === 'All' || user.roles.includes(props.role)
        )
        ?.filter((user) =>
          user.username?.toLowerCase()?.includes(props.search?.toLowerCase())
        )
        .sort(compareUsername)
        .map((user) => (
          <div key={user._id} className='displayUsers__details'>
            <div>
              <p>{user.username}</p>
              {user.roles?.includes('suspended') ? (
                <span>Suspended</span>
              ) : (
                <>
                  {user.roles?.map((role) => (
                    <span key={role + user._id}>{role}</span>
                  ))}
                </>
              )}
            </div>
            <div>
              <button
                className='button main-button'
                onClick={() => handleEditBtnClick(user)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      {!(Object.keys(userToEdit).length === 0) && <EditUser />}
    </div>
  );
};

export default DisplayUsers;
