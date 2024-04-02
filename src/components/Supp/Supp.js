import React, { useState, useEffect } from 'react';
import { Select } from "antd";
import myHeaders from '../MyHeader/myHeader';

import './supp.css';

const SuppliersSelect = ({ setSuppValue }) => {
  const [otherSuppliers, setOtherSuppliers] = useState([]);
  const { Option } = Select;

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const url3 = `https://api2.ebazaar.mn/api/backoffice/suppliers`;
        const requestOptions3 = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };
        const response = await fetch(url3, requestOptions3);
        const data = await response.json();
        const supplierList = data.data.map(item => ({
          value: item.id,
          label: item.name
        }));
        setOtherSuppliers(supplierList);
        console.log("LIISSTTT",supplierList)
      } catch (error) {
        console.error('Failed to fetch suppliers:', error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleSelectChange = (value) => {
    if (value === 'all') {
      window.location.reload();
    } else {
     
      setSuppValue(value);
    }
  };

  return (
    <div className='otherWrapper'>
      <Select
        showSearch 
        style={{ width: 150 }}
        optionFilterProp="children" 
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        } 
        onChange={handleSelectChange} 
      > 
        <Option value="all">Бүх нийлүүлэгчид</Option>
        {otherSuppliers.map((supplier) => (
          <Option key={supplier.value} value={supplier.value}>
            {supplier.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SuppliersSelect;
