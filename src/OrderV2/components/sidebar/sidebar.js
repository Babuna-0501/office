import React, { useState } from 'react';
import './sidebar.css';
import DateFilter from '../date/date';
import Search from '../search/Search';

const Sidebar = props => {
  const {
    suppliers = [],
    selectedSupplier,
    setSelectedSupplier,
    setPage,
    filterByDate,
    setParams,
    setTabLoading
  } = props;
  const [filteredSuppliers, setFilteredSuppliers] = useState(suppliers);

  const handleSearchChange = ({ target: { value } }) => {
    const fillterOfSuppliers = suppliers.filter(supplier =>
      supplier.name?.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredSuppliers(fillterOfSuppliers);
  };

  const changeSupplier = item => {
    setPage(1);
    setSelectedSupplier(item.id);
    setTabLoading(true);
  };

  return (
    <div className='sidebar'>
      <DateFilter filterByDate={filterByDate} setParams={setParams} />

      <Search onChange={handleSearchChange} />

      <div className='scroll-container'>
        {filteredSuppliers.length > 0 &&
          filteredSuppliers.map(item => (
            <div
              key={item.id}
              className={`item ${selectedSupplier === item.id && 'selected'}`}
              onClick={() => changeSupplier(item)}
            >
              <img src={item.media} alt={item.name || ''} />
              <p>{item.name || ''}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
