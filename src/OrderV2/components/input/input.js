import React, { useState, useEffect } from 'react';
import './input.css'; 
import myHeaders from '../MyHeader/myHeader';

function Input(props) {
  const [inputValue, setInputValue] = useState('');
  const [savedValues, setSavedValues] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    if (inputValue.trim() !== '' && props.data && props.data.order_id) {
      const requestBody = {
        order_id: props.data.order_id,
        order_note: inputValue.trim(),
      };
  
      fetch("https://api2.ebazaar.mn/api/order/update_note", { // Update this URL to your API endpoint
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify(requestBody),
      })
        .then((r) => r.json()) // Assuming the response is JSON
        .then((res) => {
          console.log("noteRes", res);
          // Assuming res.data is an array of saved values, update state with it
          setSavedValues([...savedValues, res.data]);
          setInputValue(''); // Clear input after saving
        })
        .catch((err) => console.log("NOTE ERR: ", err));
    }
  };

  // useEffect to handle API call when input value or props.data changes
  useEffect(() => {
    if (inputValue.trim() !== '' && props.data && props.data.order_id) {
      handleSave();
    }
  }, [inputValue, props.data]);
  
  return (
    <div className="container">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type something..."
        className="input-field"
      />
      <button onClick={handleSave} className="save-button">
        Save
      </button>
      {/* Display saved values */}
      <div>
        {savedValues.map((value, index) => (
          <p key={index}>{value}</p>
        ))}
      </div>
    </div>
  );
}

export default Input;
