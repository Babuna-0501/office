import React, { useState, useEffect } from 'react';
import myHeaders from '../components/MyHeader/myHeader';

const List = props => {
  const [filterValues, setFilterValues] = useState({
    id: '',
    date: '',
    name: '',
    register: ''
  });
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [customers, setCustomers] = useState(props.data);
  const [loading, setLoading] = useState(false);

  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilterValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const selectAll = e => {
    let selecteds = [];
    let temp = document.querySelectorAll('.customerToggle');
    for (const checkbox of temp) {
      if (e.target.checked) {
        selecteds.push(parseInt(checkbox.getAttribute('data-id')));
      }
      checkbox.checked = e.target.checked ? true : false;
    }
    setSelectedCustomers(selecteds);
  };

  const select = (customer, e) => {
    let temp = JSON.parse(JSON.stringify(selectedCustomers));
    if (e.target.checked) {
      if (temp.indexOf(parseInt(customer.tradeshop_id)) === -1) {
        temp.push(parseInt(customer.tradeshop_id));
      }
    } else {
      temp.splice(temp.indexOf(parseInt(customer.tradeshop_id)), 1);
    }
    setSelectedCustomers([...temp]);
  };

  const updatePostpaidStatus = async () => {
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

    const updateCustomerPostpaidStatus = async customer => {
      const body = JSON.stringify({ tradeshopId: customer.tradeshop_id });
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL2}/api/merchant/postpaid`,
          {
            ...requestOptions,
            body
          }
        );
        const result = await response.json();
        return result.code === 200 && result.data.changedRows > 0;
      } catch (error) {
        console.error('Алдаа гарлаа:', error);
        return false;
      }
    };

    const updatedCustomers = await Promise.all(
      selectedCustomers.map(async customerId => {
        const customerToUpdate = customers.find(
          cust => cust.tradeshop_id === customerId
        );
        if (customerToUpdate) {
          const postpaidStatusUpdated = await updateCustomerPostpaidStatus(
            customerToUpdate
          );
          return { ...customerToUpdate, ppPostpaid: postpaidStatusUpdated };
        }
        return customerToUpdate;
      })
    );

    setCustomers(updatedCustomers);
    alert('Дараа төлбөрт төлөв шинэчлэгдлээ');
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      let params = [];

      for (const key in filterValues) {
        if (filterValues[key]) {
          params.push(`${key}=${encodeURIComponent(filterValues[key])}`);
        }
      }

      let url = `${process.env.REACT_APP_API_URL2}/api/merchants?${params.join(
        '&'
      )}`;
      console.log('merchant url', url);

      try {
        const response = await fetch(url, requestOptions);
        const responseData = await response.json();
        console.log('arig', responseData.data);
        setCustomers(responseData.data); 
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log('error', error);
      }
    };

    fetchData();
  }, [filterValues]);

  // Render HTML
  const renderHTML = customers.map(customer => {
    return (
      <div className='listEntry' key={customer.tradeshop_id}>
        <div className='entryBlock' style={{ width: props.widths[0] }}>
          <input
            type='checkbox'
            data-id={customer.tradeshop_id}
            onClick={e => select(customer, e)}
            className='customerToggle'
          />
        </div>
        <div
          className='entryBlock'
          style={{ width: props.widths[1] }}
          onClick={() => props.setCustomer(customer)}
        >
          <p>{customer.tradeshop_id}</p>
        </div>
        <div className='entryBlock' style={{ width: props.widths[2] }}>
          <p>
            {customer.created_date ? customer.created_date.substr(0, 10) : null}
          </p>
        </div>
        <div className='entryBlock' style={{ width: props.widths[3] }}>
          <p>{customer.customer_name}</p>
        </div>
        <div className='entryBlock' style={{ width: props.widths[4] }}>
          <p>{customer.business_register}</p>
        </div>
        <div className='entryBlock' style={{ width: props.widths[5] }}>
          <p>{customer.ppPostpaid ? 'Тийм' : 'үгүй'}</p>
        </div>
      </div>
    );
  });

  return (
    <div id='pageList'>
      <button
        style={{
          position: 'absolute',
          top: '36px',
          left: '40rem',
          transform: 'translate(-50%, -50%)',
          border: '1px solid #46cf00',
          color: '#fff',
          background: '#46cf00',
          padding: '0 .75rem',
          cursor: 'pointer',
          height: '36px',
          fontSize: '.875rem'
        }}
        className='pp_btn'
        onClick={updatePostpaidStatus}
      >
        Дараа төлбөрт
      </button>
      <div
        className='listEntry'
        id='listHeader'
        style={{ minWidth: props.widthsSum }}
      >
        <div
          className='entryBlock'
          style={{ width: props.widths[0], justifyContent: 'center' }}
        >
          <input type='checkbox' onClick={e => selectAll(e)} />
        </div>
        <div className='entryBlock' style={{ width: props.widths[1] }}>
          <div className='entryHeader'>
            <label>Дугаар</label>
            <input
              type='text'
              name='id'
              value={filterValues.id}
              onChange={handleFilterChange}
              placeholder='ID'
            />
          </div>
        </div>
        <div className='entryBlock' style={{ width: props.widths[2] }}>
          <div className='entryHeader'>
            <label>Огноо</label>
            <input type='date' />
          </div>
        </div>
        <div className='entryBlock' style={{ width: props.widths[3] }}>
          <div className='entryHeader'>
            <label>Нэр</label>
            <input type='text' />
          </div>
        </div>
        <div className='entryBlock' style={{ width: props.widths[4] }}>
          <div className='entryHeader'>
            <label>Регистр</label>
            <input type='text' />
          </div>
        </div>
        <div className='entryBlock' style={{ width: props.widths[5] }}>
          <div className='entryHeader'>
            <label>PostPaid</label>
            <input type='text' disabled />
          </div>
        </div>
      </div>
      {renderHTML}
    </div>
  );
};

export default List;
