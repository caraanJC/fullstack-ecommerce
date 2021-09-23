import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';
import axios from 'axios';
import Modal from './Modal';

const EditUser = () => {
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
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Suspend user ${user.username}?`);
    if (result) {
      axios
        .put(`http://localhost:8080/api/users/${user._id}/suspend`, {
          role: 'suspended',
        })
        .then((res) => {
          alert(res.data.message);

          axios.get('http://localhost:8080/api/users').then((res) => {
            setUsers(res.data);
            axios
              .get(`http://localhost:8080/api/users/${user._id}`)
              .then((res) => {
                setUserToEdit(res.data);
              });
          });
        });
    } else {
      console.log('Suspension aborted');
    }
  };

  const handleLiftSuspension = (user) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Lift user ${user.username}'s suspension?`);
    if (result) {
      axios
        .put(`http://localhost:8080/api/users/${user._id}/lift`, {
          role: 'suspended',
        })
        .then((res) => {
          alert(res.data.message);

          axios.get('http://localhost:8080/api/users').then((res) => {
            setUsers(res.data);
            axios
              .get(`http://localhost:8080/api/users/${user._id}`)
              .then((res) => {
                setUserToEdit(res.data);
              });
          });
        });
    } else {
      console.log('Lifting of Suspension aborted');
    }
  };

  const handleDeleteBtnClick = (user) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Delete user ${user.username} from the database?`);
    if (result) {
      axios
        .delete(`http://localhost:8080/api/users/${user._id}`)
        .then((res) => {
          alert(res.data.message);
          axios.get('http://localhost:8080/api/users').then((res) => {
            setUsers(res.data);
            clearUserToEdit();
          });
        });
    } else {
      console.log('Delete Aborted');
    }
  };
  return (
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
  );
};

export default EditUser;
