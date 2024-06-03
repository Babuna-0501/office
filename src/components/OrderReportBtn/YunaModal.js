// Modal.js
import React from "react";
import  "./yunaModal.css"; 

const YunaModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default YunaModal;
