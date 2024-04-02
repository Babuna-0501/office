import React, { useState, useEffect } from 'react';
import myHeaders from '../MyHeader/myHeader';
import './sidebar.css'; 

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const url = `https://api2.ebazaar.mn/api/orders`;
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        const supplierList = data.data.map(item => ({
          label: item.supplier_name, 
          value: item.supplier_id, 
          logo: item.supplier_logo 
        }));
        setSuppliers(supplierList);
        console.log("Supplier list:", supplierList);
      } catch (error) {
        console.error('Failed to fetch suppliers:', error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredData = suppliers.filter(item =>
    item.label.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="sidebar">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="scroll-container">
        {filteredData.map(item => (
          <div key={item.value} className="item">
            <img src={item.logo} alt={item.label} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
