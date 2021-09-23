import { useSelector } from 'react-redux';

import DisplayUsers from './DisplayUsers';

import '../styles/ManageUsers.css';
import { useState } from 'react';

const ManageUsers = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const [role, setRole] = useState('All');
  const [search, setSearch] = useState('');

  return (
    <div className='manageUsers'>
      <h2 className='manageUsers__title'>Manage Users</h2>
      <div className='manageUsers__filter'>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value='All'>All</option>
          <option value='suspended'>Suspended</option>
          <option value='employees'>Employees</option>
          <option value='managers'>Managers</option>
        </select>
        <input
          type='text'
          placeholder='Search User'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {currentUser.roles?.includes('admin') ? (
        <DisplayUsers role={role} search={search} />
      ) : (
        <h2>Insufficient Permissions</h2>
      )}
    </div>
  );
};

export default ManageUsers;
