import { useEffect } from 'react';
import './Toast.css';

function Toast({ message, type = 'info', duration = 3000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'fas fa-check-circle';
      case 'error':
        return 'fas fa-times-circle';
      case 'warning':
        return 'fas fa-exclamation-circle';
      default:
        return 'fas fa-info-circle';
    }
  };

  return (
    <div className={`toast ${type}`}>
      <i className={getIcon()}></i>
      <span className="message">{message}</span>
      <button className="close-button" onClick={onClose}>
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
}

function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

export default ToastContainer; 