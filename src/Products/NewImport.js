function NewImport(props) {
  const save = () => {
    if (document.getElementById("sup").value == 0) {
      alert("Нийлүүлэгч сонгоно уу");
      return;
    }
    // console.log(document.getElementById("sup").value);
    let url = props.data.rows.map((product) => {
      if (parseInt(product.price, 10) > 0) {
        var raw = JSON.stringify({
          ProductName: product.name.replaceAll("'", "\\'"),
          BarCode: product.barcode,
          isActive: 1,
          SKU: product.sku,
          DefaultPrice: product.price,
          ProductDescription: product.description,
          SupplierID: document.getElementById("sup").value,
        });
        var myHeaders = new Headers();
        myHeaders.append(
          "ebazaar_token",
          localStorage.getItem("ebazaar_admin_token")
        );
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        setTimeout(() => {
          fetch("https://api2.ebazaar.mn/api/product/get1/add", requestOptions)
            .then((response) => response.json())
            .then((result) => {
              // console.log(result);
            });
        }, 500);
      }
    });
  };
  return props.data.rows ? (
    <div id="bg">
      <div id="foo">
        <select id="sup">
          <option value="0">Сонгоно уу</option>
          {props.suppliers.map((supplier, index) => {
            return (
              <option value={supplier.id} key={index}>
                {supplier.name}
              </option>
            );
          })}
        </select>

        <button onClick={() => save()}>Хадгалах</button>
        {props.data.rows.map((product, index) => {
          return (
            <div key={index}>
              <span>{product.sku}</span>
              <span>{product.barcode}</span>
              <span>{product.price}</span>
              <span>{product.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
}

export default NewImport;
