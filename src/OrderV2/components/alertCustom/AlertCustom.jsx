import React from 'react';
import './alertCustom.css';
import successSvg from './success.svg';
import errorSvg from './error.svg';
import warningSvg from './warning.svg';

const AlertCustom = ({
  isOpen,
  onClose,
  header,
  message,
  type,
  onSubmit,
  content
}) => {
  const svgLink =
    type === 'error' ? errorSvg : type === 'success' ? successSvg : warningSvg;

  const renderButtons = () => {
    if (type === 'approve') {
      return (
        <div className='approve'>
          <button onClick={onClose}>Cancel</button>
          <button onClick={onSubmit}>Ok</button>
        </div>
      );
    }

    return (
      <div className='success'>
        <button onClick={onClose}>OK</button>
      </div>
    );
  };

  return (
    <div className={`popup-custom-container ${isOpen ? 'open' : ''}`}>
      <div className='popup-custom-overlay'></div>

      <div className='popup-custom-wrapper'>
        <button className='close-btn' onClick={onClose}>
          X
        </button>

        {header && <div className='popup-custom-header'>{header}</div>}
        <div className='popup-custom-content'>
          <div className='response-image'>
            <img src={svgLink} alt={type} />
          </div>

          <p>{message}</p>

          {content}
        </div>
        <div className='popup-custom-footer'>{renderButtons()}</div>
      </div>
    </div>
  );
};

export default AlertCustom;
