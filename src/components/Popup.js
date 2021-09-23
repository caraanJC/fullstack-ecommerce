import '../styles/Popup.css';

const Popup = ({ message, type }) => {
  return (
    <div className={`popup ${type ? 'popup-' + type : ''}`}>{message}</div>
  );
};

export default Popup;
