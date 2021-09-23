import '../styles/Modal.css';

const Modal = (props) => {
  return (
    <div className='modal'>
      <div className='modal__wrapper'>{props.children}</div>
    </div>
  );
};

export default Modal;
