import '../styles/Modal.css';

const Modal = (props) => {
  const classNames = `${props.classes} modal`;
  return (
    <div className={classNames}>
      <div className='modal__wrapper'>{props.children}</div>
    </div>
  );
};

export default Modal;
