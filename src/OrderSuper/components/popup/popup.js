import React, { useState } from 'react';
import './popup.css';

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Dynamic Popup</h2>
            <p>This is a dynamic popup/modal in React.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
