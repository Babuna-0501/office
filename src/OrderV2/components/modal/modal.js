import React from "react";
import './modal.css';

const Modal = ({ open, payload, cancel, save, onChange, props }) => {
  if (!open) return null;
  return (
    <section className="modal">
      <article className="modal-content p-lg-4">
        <div className="exit-icon text-end">
          {/* <IoMdClose onClick={onClose} /> */}
          <button onClick={cancel}>Close</button>
        </div>
        <main className="modal-mainContents">
          <label>Price:</label>
          <input value={payload.price} onChange={(e) => onChange(e, "price")} />

          <label>Quantity:</label>
          <input
            value={payload.quantity}
            onChange={(e) => onChange(e, "quantity")}
          />

          <span>
            {payload.price}₮ * {payload.quantity} =
            {Math.floor(payload.price * payload.quantity)}₮
          </span>
          <div className="modal-button">
            <button onClick={cancel}>Cancel</button>
            <button onClick={save}>Save</button>
          </div>
        </main>
      </article>
    </section>
  );
};

export default Modal;
