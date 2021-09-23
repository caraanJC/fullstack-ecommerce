import { useState } from 'react';
import axios from 'axios';
import { actionCreators } from '../state';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { distinct, notify } from '../helper';
import Modal from './Modal';

const AddItemForm = (props) => {
  const items = useSelector((state) => state.items);
  const popup = useSelector((state) => state.popup);

  const initialState = {
    name: '',
    price: 50,
    description: '',
    priority: 10,
    outOfStock: false,
    image: '',
    category: '',
    newCategory: '',
  };
  const [newItem, setNewItem] = useState(initialState);

  const dispatch = useDispatch();
  const { setItems, setupPopup } = bindActionCreators(actionCreators, dispatch);

  const handleInputChange = (e) => {
    if (e.target.name === 'outOfStock') {
      setNewItem({
        ...newItem,
        [e.target.name]: e.target.checked,
      });
    } else {
      setNewItem({
        ...newItem,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/api/items/addItem', {
        ...newItem,
        category: newItem.category ? newItem.category : newItem.newCategory,
      })
      .then((res) => {
        notify(popup, setupPopup, `${newItem.name} has been added`, 'success');

        setNewItem(initialState);
        axios.get('http://localhost:8080/api/items').then((res) => {
          setItems(res.data);
          props.setShowAddForm(false);
        });
      });
  };

  return (
    <Modal>
      <div onClick={() => props.setShowAddForm(false)} className='modal__close'>
        X
      </div>
      <form onSubmit={handleSubmit}>
        <h2>Add Item</h2>
        <p>
          <label htmlFor='addItemName'>Name: </label>
          <input
            type='text'
            id='addItemName'
            required
            value={newItem.name}
            onChange={handleInputChange}
            name='name'
          />
        </p>
        <p>
          <label htmlFor='addItemPrice'>Price: </label>
          <input
            type='number'
            id='addItemPrice'
            required
            value={newItem.price}
            onChange={handleInputChange}
            name='price'
          />
        </p>
        <p>
          <label htmlFor='addItemDescription'>Description: </label>
          <textarea
            id='addItemDescription'
            value={newItem.description}
            onChange={handleInputChange}
            name='description'
            required
          />
        </p>
        <p>
          <label htmlFor='addItemPriority'>Priority: </label>
          <input
            type='number'
            id='addItemPriority'
            required
            value={newItem.priority}
            onChange={handleInputChange}
            name='priority'
          />
        </p>

        <p>
          <label htmlFor='addItemImage'>Image: </label>
          <input
            type='url'
            id='addItemImage'
            required
            value={newItem.image}
            onChange={handleInputChange}
            name='image'
          />
        </p>

        <p>
          <label htmlFor='addItemCategory'>Category: </label>
          <select
            name='category'
            id='addItemCategory'
            value={newItem.category}
            onChange={handleInputChange}
          >
            {items
              ?.map((item) => item.category)
              ?.filter(distinct)
              ?.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            <option value=''>New Category</option>
          </select>
          {!newItem.category && (
            <input
              id='addItemNewCategory'
              required
              type='text'
              name='newCategory'
              value={newItem.newCategory}
              onChange={handleInputChange}
            />
          )}
        </p>
        <p>
          <label htmlFor='addItemOutOfStock'>Out of Stock: </label>
          <input
            type='checkbox'
            id='addItemOutofStock'
            checked={newItem.outOfStock}
            onChange={handleInputChange}
            name='outOfStock'
          />
        </p>

        <input type='submit' value='Add Item' className='modal__button' />
      </form>
    </Modal>
  );
};

export default AddItemForm;
