import React, { useState, useContext } from 'react';
import LoadingSpinner from '../components/Spinner/Spinner';
import ProductReportHook from '../Hooks/ProductsReportHook';
import myHeaders from '../components/MyHeader/myHeader';

function XLSX({ suppliers, onClose }) {
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const productsCtx = useContext(ProductReportHook);

  const downloadExcel = () => {
    setLoading(true);
    const supplierId = selectedSupplier || 'all';
    const url = `${process.env.REACT_APP_API_URL2}/api/product/report?supplierId=${supplierId}`;

    fetch(url, {
      method: 'GET',
      headers: myHeaders,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Алдаатай хүсэлт');
        }
        return response.blob(); 
      })
      .then(blob => {
        const downloadUrl = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'product_report.xlsx'); 
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        setLoading(false);
      })
      .catch(error => {
        console.error('Excel татах үед алдаа гарлаа:', error);
        setLoading(false);
      });
  };

  const handleSupplierChange = (event) => {
    setSelectedSupplier(event.target.value);
  };

  const closePopup = () => {
    productsCtx?.setMassExport(false); 
  };

  if (!isVisible) {
    return null; 
  }

  return (
    <div
      id="formwithtransparentbackground"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
      }}
    >
      <div
        id="form"
        style={{
          position: 'relative',
          width: '400px',
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          zIndex: 10000,
          textAlign: 'center',
        }}
      >
        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <span
              id="close"
              onClick={closePopup}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#555',
              }}
            >
              &#10005;
            </span>

            <label
              htmlFor="supplier-select"
              style={{
                display: 'block',
                marginBottom: '10px',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              Нийлүүлэгч сонгох:
            </label>
            <select
              id="supplier-select"
              value={selectedSupplier}
              onChange={handleSupplierChange}
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '20px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '14px',
                height:'50px'
              }}
            >
              <option value="">Бүх нийлүүлэгч</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>

            <button
              onClick={downloadExcel}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#8dc543',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              Тайлан татах
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default XLSX;
