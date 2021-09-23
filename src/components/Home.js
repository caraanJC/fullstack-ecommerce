import { useState } from 'react';
import { useSelector } from 'react-redux';

import AddItemForm from './AddItemForm';
import Menu from './Menu';

import '../styles/Home.css';

const Home = () => {
  const currentUser = useSelector((state) => state.currentUser);

  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddItem = () => {
    setShowAddForm(true);
  };

  return (
    <div className='home'>
      <div className='home__welcome'>
        {Object.keys(currentUser).length > 0 && (
          <p>Welcome, {currentUser.username}</p>
        )}
        {(currentUser.roles?.includes('admin') ||
          currentUser.roles?.includes('manager') ||
          currentUser.roles?.includes('employee')) && (
          <>
            {showAddForm ? (
              <AddItemForm setShowAddForm={setShowAddForm} />
            ) : (
              <button onClick={handleAddItem} className='button main-button'>
                Add Item
              </button>
            )}
          </>
        )}
      </div>
      <Menu />
    </div>
  );
};

export default Home;
