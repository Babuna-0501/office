function DeliveryDate(props) {
  let order = props.data;
  const save = () => {
    const foobar = document.getElementById('deliverydate');
    if (foobar.value !== '') {
      let d = new Date();
      var myHeaders = new Headers();
      myHeaders.append(
        'ebazaar_token',
        localStorage.getItem('ebazaar_admin_token')
      );
      myHeaders.append('Content-Type', 'application/json');
      var raw = JSON.stringify({
        order_id: order.order_id,
        delivery_date: foobar.value
      });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      fetch(
        `${process.env.REACT_APP_API_URL2}/api/order/update`,
        requestOptions
      )
        .then(response => response.json())
        .then(result => {
          if (result.code === 200) {
            alert('Амжилттай хадгаллаа!');
            order.delivery_date = foobar.value;
            props.setOrder(order);
          }
        });
    } else {
      alert('Үнийн мэдээлэл оруулна уу');
    }
  };
  return (
    <div id='bg' style={{ zIndex: '150' }}>
      <div id='foo'>
        <span className='close' onClick={() => props.setDeliveryDate(false)}>
          Close
        </span>
        <h1>Хүргэлтийн өдөр</h1>
        <input
          type='date'
          id='deliverydate'
          defaultValue={props.data.delivery_date.substr(0, 10)}
        />
        <button onClick={() => save()}>Хадгалах</button>
      </div>
    </div>
  );
}

export default DeliveryDate;
