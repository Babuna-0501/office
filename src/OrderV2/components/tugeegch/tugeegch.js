import React, { useState } from 'react';
import myHeaders from '../MyHeader/myHeader';
import './tugeegch.css';
import Avatar from '../avatar/Avatar';

const Tugeegch = props => {
  const { selectedRows, deliveryMans } = props;
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const updateOrdersDeliver = async () => {
    let order_ids = [];

    selectedRows.forEach(item => {
      order_ids.push(item.original.order_id);
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify({
        userId: selectedUserId.toString(),
        orderIds: order_ids
      })
    };

    const url = `${process.env.REACT_APP_API_URL2}/api/order/deliveryman`;

    await fetch(url, requestOptions);
  };

  const handleSave = () => {
    setShowPopup(false);

    updateOrdersDeliver();
  };

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers =
    deliveryMans && deliveryMans.length > 0
      ? deliveryMans.filter(
          user =>
            user.first_name?.includes(searchTerm) ||
            user.last_name?.includes(searchTerm)
        )
      : [];

  return (
    <div>
      <button
        onClick={togglePopup}
        style={{
          height: '35px',
          fontSize: '14px',
          padding: '5px',
          border: 'none',
          background: 'rgb(118, 204, 51)',
          color: '#fff',
          borderRadius: '5px',
          opacity: selectedRows.length > 0 ? 1 : 0.3
        }}
        disabled={selectedRows.length > 0 ? false : true}
      >
        Түгээгч хувиарлах
      </button>

      {showPopup && (
        <div className='popup-background'>
          <div className='popup-container'>
            <div className='popup-header clsx'>
              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}
              >
                Түгээгч сонгох
              </h2>
              <input
                type='text'
                placeholder='Түгээгч хайх ...'
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <div className='popup-content'>
              {filteredUsers.map(user => {
                const { profile_picture, user_id, last_name, first_name } =
                  user;

                return (
                  <div key={user_id} className='popup-item'>
                    <label>
                      <input
                        type='checkbox'
                        name='tugeegch'
                        checked={selectedUserId === user_id ? true : false}
                        onChange={() => setSelectedUserId(user_id)}
                      />
                      <Avatar
                        imageUrl={profile_picture}
                        name={last_name || first_name}
                      />
                      {first_name} {last_name}
                    </label>
                  </div>
                );
              })}
            </div>

            <div className='popup-footer'>
              <button onClick={togglePopup}>Цуцлах</button>

              <button
                style={{
                  background: '#2ab674',
                  opacity: selectedUserId ? 1 : 0.3
                }}
                disabled={!selectedUserId ? true : false}
                onClick={handleSave}
              >
                Хадгалах
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tugeegch;
