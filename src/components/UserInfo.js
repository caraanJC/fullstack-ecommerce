import { useState } from 'react';
import { useSelector } from 'react-redux';
import EditUserInfo from './EditUserInfo';

import '../styles/UserInfo.css';

const UserInfo = () => {
  const currentUser = useSelector((state) => state.currentUser);

  const [editProfile, setEditProfile] = useState(false);

  return (
    <div className='userInfo'>
      <div className='userInfo__title'>
        <h2>User Info</h2>
        <button onClick={() => setEditProfile(true)}>✏️</button>
      </div>

      <div className='userInfo__details'>
        <p>
          <span className='userInfo__label'>Username:</span>{' '}
          {currentUser.username}
        </p>
        <p>
          <span className='userInfo__label'>Email:</span> {currentUser.email}
        </p>
        <p>
          <span className='userInfo__label'>First Name</span>:{' '}
          {currentUser.firstName}
        </p>
        <p>
          <span className='userInfo__label'>Last Name</span>:{' '}
          {currentUser.lastName}
        </p>
        <p>
          <span className='userInfo__label'>Facebook Name</span>:{' '}
          {currentUser.fb}
        </p>
        <p>
          <span className='userInfo__label'>Phone Number</span>:{' '}
          {currentUser.phone}
        </p>
        <p>
          <span className='userInfo__label'>Address 1</span>:{' '}
          {currentUser.address1}
        </p>
        <p>
          <span className='userInfo__label'>Address 2</span>:{' '}
          {currentUser.address2}
        </p>

        {editProfile && (
          <div>
            <EditUserInfo setEditProfile={setEditProfile} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
