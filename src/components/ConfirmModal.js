import '../styles/ConfirmModal.css';

const ConfirmModal = (props) => {
  const classNames = `${props.classes} confirmModal`;
  return (
    <div className={classNames}>
      <div
        className='confirmModal__overlay'
        onClick={() =>
          props.setConfirmModalStatus({
            open: false,
            message: 'Are you sure?',
            method: null,
          })
        }
      ></div>
      <div className='confirmModal__container'>
        <h3 className='confirmModal__title'>
          {props.confirmModalStatus.title}{' '}
          <button
            className='confirmModal__button confirmModal__button--close'
            onClick={() =>
              props.setConfirmModalStatus({
                open: false,
                message: 'Are you sure?',
                method: null,
              })
            }
          >
            X
          </button>
        </h3>
        <p className='confirmModal__message'>
          {props.confirmModalStatus.message}
        </p>
        <div className='confirmModal__buttonGroup'>
          <button
            className='confirmModal__button confirmModal__button--yes'
            onClick={() => {
              props.confirmModalStatus.method(props.confirmModalStatus.user);
              props.setConfirmModalStatus({
                open: false,
                message: 'Are you sure?',
                method: null,
              });
            }}
          >
            Yes
          </button>
          <button
            className='confirmModal__button confirmModal__button--no'
            onClick={() =>
              props.setConfirmModalStatus({
                open: false,
                message: 'Are you sure?',
                method: null,
              })
            }
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
