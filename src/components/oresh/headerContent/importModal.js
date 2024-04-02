import React from "react";
import css from "./importModal.module.css";
import { Modal } from "../../../Achiltiinzahialga/components/common/Modal";

const ImportModal = ({ isModal, setIsModal, data, fetchData }) => {
  const supplierIdStyle = { width: "24%" };
  const merchantIdStyle = { width: "24%" };
  const barcodeStyle = { width: "28%" };
  const stockStyle = { width: "24%" };

  return (
    <>
      {isModal && (
        <Modal
          height={600}
          closeHandler={() => {
            setIsModal(false);
          }}
        >
          <div className={css.modalContainer}>
            <div className={css.tableHeader}>
              <div style={supplierIdStyle}>Supplier Id</div>
              <div style={merchantIdStyle}>Merchant Id</div>
              <div style={barcodeStyle}>Barcode</div>
              <div style={stockStyle}>Stock</div>
            </div>
            <div className={css.tableBody}>
              {data.data.map((row) => (
                <div className={css.tableRow}>
                  <>
                    <div style={supplierIdStyle}>{row.supplierId}</div>
                    <div style={merchantIdStyle}>{row.merchantId}</div>
                    <div style={barcodeStyle}>{row.barcode}</div>
                    <div style={stockStyle}>{row.stock}</div>
                  </>
                </div>
              ))}
            </div>
            <div className={css.bottom}>
              <button
                className={css.button}
                onClick={() => {
                  fetchData();
                }}
              >
                Хадгалах
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ImportModal;
