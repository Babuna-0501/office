import React from "react";
import "./modal.css";

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
export const ExportModal = ({
  open,
  payload,
  cancel,
  exportExcel,
  print,

  props,
}) => {
  if (!open) return null;
  return (
    <section className="modal modal_export">
      <article className="modal-content-export p-lg-4">
        <div className="exit-icon text-end">
          {/* <IoMdClose onClick={onClose} /> */}
          <button onClick={cancel}>Close</button>
        </div>
        <main className="modal-mainContents">
          <div className="modal_table">
            <div className="modal_table_head">
              <span className="flex-1">№</span>
              <span className="flex-3">Дугаар</span>
              <span>Барааны нэр</span>
              <span className="flex-4">Тоо ширхэг</span>
              <span className="flex-4">Нэгж үнэ</span>
              <span className="flex-5">Нийт үнэ</span>
              <span className="flex-5">Эцсийн нийт үнэ</span>
              <span className="flex-6">Үйлчилгээний газрын нэр</span>
              <span className="flex-3">Утас</span>
              <span className="flex-4">Хариуцсан ХТ</span>
              <span className="flex-4">Түгээгч</span>
              <span className="flex-8">Дэлгэрэнгүй хаяг</span>
            </div>
            {payload?.map((p, i) => {
              let price = 0;
              let quantity = 0;
              p.line.map((l) => {
                quantity += l.quantity;
                price += l.amount;
              });
              return (
                <>
                  <div key={i} className="modal_table_head head">
                    <span className="flex-1">{i + 1}</span>
                    <span className="flex-3">{p.order_id}</span>
                    <span>НИЙТ</span>
                    <span className="flex-4">{quantity}</span>
                    <span className="flex-4"></span>
                    <span className="flex-5">{price}₮</span>
                    <span className="flex-5">{price}₮</span>
                    <span className="flex-6">{p.tradeshop_name}</span>
                    <span className="flex-3">Утас</span>
                    <span className="flex-4">Хариуцсан ХТ</span>
                    <span className="flex-4">{p.deliver_man ?? ""}</span>
                    <span className="flex-8">{p.address}</span>
                  </div>
                  {p.line.map((l, index) => {
                    return (
                      <div key={index} className="modal_table_head">
                        <span className="flex-1">{index + 1}</span>
                        <span className="flex-3"></span>
                        <span>{l.product_name}</span>
                        <span className="flex-4">{l.quantity}</span>
                        <span className="flex-4">{l.price}</span>
                        <span className="flex-5">{l.price_amount}₮</span>
                        <span className="flex-5">{price}₮</span>
                        <span className="flex-6"></span>
                        <span className="flex-3"></span>
                        <span className="flex-4"></span>
                        <span className="flex-4"></span>
                        <span className="flex-8"></span>
                      </div>
                    );
                  })}
                </>
              );
            })}
          </div>

          <div className="modal-button export-btns">
            <button onClick={cancel}>Цуцлах</button>
            <button onClick={exportExcel}>Татах</button>
            <button onClick={print}>Хэвлэх</button>
          </div>
        </main>
      </article>
    </section>
  );
};
