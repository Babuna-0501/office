import React, { useState, useEffect } from 'react';
import myHeaders from '../MyHeader/myHeader';
import './tugeegch.css';

const Popup = (props) => {
  const { selectedDeliveryman, setSelectedDeliveryman } = props;
  const [isChecked, setIsChecked] = useState(props.checked);
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rolenew, setRolenew] = useState([]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleSave = () => {
    setShowPopup(false);
    console.log("Selected Users:", selectedUsers);
  };

  const handleSelectDeliveryman = (user) => {
    setSelectedDeliveryman(user);
    togglePopup(); 
  };

  const fetchdata = async () => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    try {
      const data = await fetch("https://api2.ebazaar.mn/api/backoffice/users", requestOptions);
      const roledata = await fetch("https://api2.ebazaar.mn/api/backoffice/role", requestOptions);
      const resroledata = await roledata.json();
      const res = await data.json();
      setUsers(res.data);
      setRolenew(resroledata.roles);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []); 

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUserSelect = (userId) => {
    setSelectedUsers(prevUsers => {
      if (prevUsers.includes(userId)) {
        return prevUsers.filter(id => id !== userId);
      } else {
        return [...prevUsers, userId];
      }
    });
  };

  return (
    <div>
      <button onClick={togglePopup} style={{ height: "35px", fontSize: "14px", padding: "5px", border: "none", background: "rgb(118, 204, 51)", color: "#fff", borderRadius: "5px", marginTop: "3px" }}>Түгээгч хувиарлах</button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "20px" }}>Түгээгч сонгох</h2>
              <input
                type="text"
                placeholder="Түгээгч хайх ..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div>
                {users.map((user) => {
                  if (user.role === 2 && user.first_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return (
                      <div key={user.user_id}>
                        <label>
                          <input
                            type="checkbox"
                            value={user.user_id}
                            checked={selectedUsers.includes(user.user_id)}
                            onChange={() => handleUserSelect(user.user_id)}
                          />
                          Нэр: {user.first_name} {user.last_name}
                        </label>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
            <div className='footer' style={{ display: "flex", gap: "30px" }}>
              <button style={{ background: "#2ab674" }} onClick={handleSave}>Хадгалах</button>
              <button onClick={togglePopup}>Хаах</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;