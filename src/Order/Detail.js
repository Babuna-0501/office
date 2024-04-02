function Detail(props) {
  // console.log(props);
  let grandtotal = 0;
  return (
    <div id="container-detail">
      <div id="detail">
        <p style={{ fontWeight: "bold" }}>{props.order.tradeshopName}</p>
        <p>{props.order.address}</p>
        <p style={{ fontSize: ".875rem" }}>Утас: {props.order.phone}</p>
        <p style={{ fontSize: ".875rem" }}>Регистер: {props.order.register}</p>
        <table style={{ width: "100%" }}>
          <tr>
            <td style={{ width: "55%", fontWeight: "bold" }}>Нэр</td>
            <td style={{ width: "15%", fontWeight: "bold" }}>Тоо, ширхэг</td>
            <td style={{ width: "15%", fontWeight: "bold" }}>Үнэ</td>
            <td style={{ width: "15%", fontWeight: "bold" }}>Дүн</td>
          </tr>
          {props.data.map((line, index) => {
            let total = line.price * line.quantity;
            grandtotal += total;
            return (
              <tr key={index}>
                <td>{line.product_name}</td>
                <td>{line.quantity}</td>
                <td>{line.price.toLocaleString()}₮</td>
                <td>{total.toLocaleString()}₮</td>
              </tr>
            );
          })}
          <tr>
            <td colspan={3} style={{ width: "15%", fontWeight: "bold" }}>
              Total
            </td>
            <td style={{ width: "15%", fontWeight: "bold" }}>
              {grandtotal.toLocaleString()}₮
            </td>
          </tr>
        </table>
        <span className="close" onClick={() => props.close()}>
          Close
        </span>
      </div>
    </div>
  );
}

export default Detail;
