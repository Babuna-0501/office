import writeXlsxFile from "write-excel-file";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import canvasToImage from "canvas-to-image";
import { saveAsPng, saveAsJpeg } from "save-html-as-image";

const schema = [
  {
    column: "№",
    type: String,
    value: (d) => d.OrderNumber,
  },
  {
    column: "Customer Register",
    type: String,
    value: (d) => d.Register,
  },
  {
    column: "Customer Mobile/Telephone",
    type: String,
    value: (d) => d.Phone,
  },
  {
    column: "Customer Name",
    type: String,
    value: (d) => d.Name,
    width: 30,
  },
  {
    column: "Brand",
    type: String,
    value: (d) => d.Brand,
  },
  {
    column: "ProductName",
    type: String,
    value: (d) => d.ProductName,
    width: 50,
  },
  {
    column: "SKU",
    type: String,
    value: (d) => d.SKU,
  },
  {
    column: "Barcode",
    type: String,
    value: (d) => d.Barcode,
  },
  {
    column: "Qty",
    type: String,
    value: (d) => d.Qty,
  },
  {
    column: "Unit Price",
    type: String,
    value: (d) => d.Price,
  },
  {
    column: "Total",
    type: String,
    value: (d) => d.Total,
  },
  {
    column: "Order Date",
    type: String,
    value: (d) => d.Created,
  },
];

const output = (lines, filename, status) => {
  if (parseInt(status, 10) === 1) {
    alert("Захиалга баталгаажуулсны дараа татна уу!");
    return;
  } else if (parseInt(status, 10) === 5) {
    alert("Цуцлагдсан захиалга байна!");
    return;
  }
  writeXlsxFile(lines, {
    schema,
    fileName: `${filename}.xlsx`,
  });
};
console.log("test");
let elementId = window.document.getElementById("foo");
const jpg = (elementID, orderID) => {
  // console.log(elementID);
  // console.log(window.document.getElementById(elementID));

  htmlToImage
    .toJpeg(window.document.getElementById(elementID), { quality: 0.95 })
    .then(function (dataUrl) {
      // console.log(dataUrl);
      var link = document.createElement("a");
      link.download = orderID + ".jpeg";
      link.href = dataUrl;
      link.click();
    });
};
const png = () => {
  saveAsPng(
    window.document.getElementById("foo"),
    { filename: "Report", printDate: true },
    {
      backgroundColor: "rgba(101,198,185,0.5)",
      style: {
        padding: "4px",
        display: "flex",
        justifyContent: "center",
      },
    }
  );
};
function Lines(props) {
  // console.log(props);

  const orderData = props.data.data;
  let temp = [];
  let foo = [];
  for (const line in props.lines) {
    const id = Math.random(0, 100000000000000000);
    // console.log(props.lines[line]);
    foo = props.lines[line];
    //if(parseInt(line, 10) !== 0) {
    if (foo["lines"].length > 0) {
      let foobar = [];
      temp.push(
        <div className="sub-order" id={id}>
          <h1>
            {foo.name}
            <span
              style={{
                marginLeft: "auto",
                display: "inline-block",
                float: "right",
                color: "steelblue",
                cursor: "pointer",
              }}
              onClick={() =>
                output(foobar, orderData.order_id, orderData.status)
              }
            >
              EXCEL татах
            </span>
            <span
              onClick={() => jpg(id, orderData.order_id)}
              style={{
                marginLeft: "auto",
                marginRight: "1rem",
                display: "inline-block",
                float: "right",
                color: "steelblue",
                cursor: "pointer",
              }}
            >
              Зураг татах
            </span>
          </h1>
          {foo.lines.map((l) => {
            foobar.push({
              OrderNumber: String(orderData.order_id),
              Register: String(orderData.register),
              Phone: String(orderData.phone),
              Name: String(orderData.tradeshop_name),
              Brand: String(foo.name),
              ProductName: String(l.product_name),
              SKU: String(l.product_sku),
              Barcode: String(l.product_bar_code),
              Qty: String(l.quantity),
              Price: String(l.price),
              Total: String(parseInt(l.price, 10) * parseInt(l.quantity, 10)),
              Created: String(orderData.order_date.substr(0, 10)),
            });
            // console.log(l);
            return (
              <div className="line">
                <div className="line-image">
                  <img
                    src={
                      l.product_image
                        ? l.product_image
                            .split(",")[0]
                            .replace("original", "small")
                        : null
                    }
                    alt="icons"
                  />
                </div>
                <div className="line-info">
                  <h3>{l.product_name}</h3>
                  <h3>
                    {l.price.toLocaleString()}₮ x {l.quantity} ={" "}
                    {(l.price * l.quantity).toLocaleString()}₮
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    //}
  }
  return temp;
}

export default Lines;

/*
address: "дарь эх шинэ буудал гурван мөнх үйлчилгээний төв"
business_name: "мягмарсүрэн"
business_type_id: "1"
cart_date: "2022-06-15T10:26:01.000Z"
customer_id: 2340
delivery_date: "2022-06-22T00:00:00.000Z"
description: "[{\"date\":\"2022-6-21 14:11\",\"body\":\"Захиалгын падаан мэйлээр илгээсэн\",\"by\":\"nomin-erdene.b@ebazaar.mn\"}]"
description1: null
line: (2) [{…}, {…}]
minimum_order_amount: 100000
order_date: "2022-06-21T09:31:12.000Z"
order_id: 5708
phone: "99025401"
raw_order: "[{\"ProductID\":234651,\"Quantity\":24,\"Price\":7800,\"ZPoint\":null},{\"ProductID\":234652,\"Quantity\":10,\"Price\":15400,\"ZPoint\":null}]"
register: "ЗЮ84062605"
state: 2
status: 2
supplier_id: 149
supplier_logo: "https://media.ebazaar.link/logo/supplier/tavanbogd-international.jpg"
supplier_name: "ТАВАНБОГД ИНТЕРНЭЙШНЛ ХХК"
tradeshop_city: "1"
tradeshop_district: "5"
tradeshop_horoo: "433"
tradeshop_id: 2365
tradeshop_name: "од хийморь"
updated_date: "2022-06-21T14:11:39.000Z"
user_id: 803271
zpoint: 0
}*/
