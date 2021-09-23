import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';
import Modal from './Modal';

import '../styles/EditItemForm.css';
import { notify } from '../helper';

const EditItemForm = () => {
  const itemToEdit = useSelector((state) => state.itemToEdit);
  const popup = useSelector((state) => state.popup);

  const [updatedItem, setUpdatedItem] = useState(itemToEdit);

  const dispatch = useDispatch();
  const { setItems, setItemToEdit, setupPopup } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const handleInputChange = (e) => {
    if (e.target.name === 'outOfStock') {
      setUpdatedItem({
        ...updatedItem,
        [e.target.name]: e.target.checked,
      });
    } else {
      setUpdatedItem({
        ...updatedItem,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    axios
      .put('http://localhost:8080/api/items/editItem', updatedItem)
      .then((res) => {
        notify(
          popup,
          setupPopup,
          `${itemToEdit.name} has been updated`,
          'success'
        );
        axios.get('http://localhost:8080/api/items/').then((res) => {
          setItems(res.data);

          setItemToEdit({});
        });
      });
  };

  return (
    <Modal>
      <button className='modal__close' onClick={() => setItemToEdit({})}>
        X
      </button>
      <form onSubmit={handleEditFormSubmit} className='editItemForm'>
        <h2 className='editItemForm__title'>Edit Item</h2>
        <p className='editItemForm__name'>
          <label htmlFor='editItemName'>Name: </label>
          <input
            type='text'
            value={updatedItem.name}
            name='name'
            onChange={handleInputChange}
            id='editItemName'
            required
          />
        </p>
        <p className='editItemForm__price'>
          <label htmlFor='editItemPrice'>Price: </label>
          <input
            type='number'
            value={updatedItem.price}
            name='price'
            onChange={handleInputChange}
            id='editItemPrice'
            required
          />
        </p>
        <p className='editItemForm__description'>
          <label htmlFor='editItemDescription'>Description: </label>
          <textarea
            value={updatedItem.description}
            name='description'
            onChange={handleInputChange}
            id='editItemDescription'
            required
          />
        </p>
        <p className='editItemForm__priority'>
          <label htmlFor='editItemPriority'>Priority: </label>
          <input
            type='number'
            value={updatedItem.priority}
            name='priority'
            onChange={handleInputChange}
            id='editItemPriority'
            required
          />
        </p>
        <p className='editItemForm__image'>
          <label htmlFor='editItemImage'>Image: </label>
          <input
            type='url'
            id='editItemImage'
            value={updatedItem.image}
            name='image'
            onChange={handleInputChange}
            required
          />
        </p>
        <p className='editItemForm__stock'>
          <label htmlFor='editItemOutOfStock'>Out of Stock: </label>
          <input
            type='checkbox'
            id='editItemOutOfStock'
            checked={updatedItem.outOfStock}
            onChange={handleInputChange}
            name='outOfStock'
          />
        </p>
        <input type='submit' value='Save' className='modal__button' />
      </form>
    </Modal>
  );
};

export default EditItemForm;
