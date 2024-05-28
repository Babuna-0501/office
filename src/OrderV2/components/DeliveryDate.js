import React, { useState } from 'react';

function DeliveryDate({ data, setOrder, closeDeliveryDate }) {
  const [date, setDate] = useState(data.delivery_date.substr(0, 10));

  const save = () => {
    if (date !== "") {
      var myHeaders = new Headers();
      myHeaders.append(
        "ebazaar_token",
        localStorage.getItem("ebazaar_admin_token")
      );
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        order_id: data.order_id,
        delivery_date: date,
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch("https://api2.ebazaar.mn/api/order/update", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.code === 200) {
            alert("Амжилттай хадгаллаа!");
            data.delivery_date = date;
            setOrder(data);
            window.location.reload(); 
          }
        });
    } else {
      alert("Алдаа гарлаа");
    }
  };

  return (
    <div id="bg" style={{ zIndex: '150' }}>
      <div id="foo">
        <span className="close" onClick={closeDeliveryDate}>
          Close
        </span>
        <h1>Хүргэлтийн өдөр</h1>
        <input
          type="date"
          id="deliverydate"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={save}>Хадгалах</button>
      </div>
    </div>
  );
}

export default DeliveryDate;
