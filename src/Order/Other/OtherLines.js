import writeXlsxFile from 'write-excel-file';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import canvasToImage from 'canvas-to-image';
import { saveAsPng, saveAsJpeg } from 'save-html-as-image';
import css from './otherlines.module.css';
import { replaceImageUrl } from '../../utils';

const schema = [
  {
    column: '№',
    type: String,
    value: d => d.OrderNumber
  },
  {
    column: 'Customer Register',
    type: String,
    value: d => d.Register
  },
  {
    column: 'Customer Mobile/Telephone',
    type: String,
    value: d => d.Phone
  },
  {
    column: 'Customer Name',
    type: String,
    value: d => d.Name,
    width: 30
  },
  {
    column: 'Brand',
    type: String,
    value: d => d.Brand
  },
  {
    column: 'ProductName',
    type: String,
    value: d => d.ProductName,
    width: 50
  },
  {
    column: 'SKU',
    type: String,
    value: d => d.SKU
  },
  {
    column: 'Barcode',
    type: String,
    value: d => d.Barcode
  },
  {
    column: 'Qty',
    type: String,
    value: d => d.Qty
  },
  {
    column: 'Unit Price',
    type: String,
    value: d => d.Price
  },
  {
    column: 'Total',
    type: String,
    value: d => d.Total
  },
  {
    column: 'Order Date',
    type: String,
    value: d => d.Created
  }
];

const output = (lines, filename, status) => {
  if (parseInt(status, 10) === 1) {
    alert('Захиалга баталгаажуулсны дараа татна уу!');
    return;
  } else if (parseInt(status, 10) === 5) {
    alert('Цуцлагдсан захиалга байна!');
    return;
  }
  writeXlsxFile(lines, {
    schema,
    fileName: `${filename}.xlsx`
  });
};
const jpg = (elementID, orderID) => {
  // console.log(elementID);
  // console.log(window.document.getElementById(elementID));
  htmlToImage
    .toJpeg(window.document.getElementById(elementID), { quality: 0.95 })
    .then(function (dataUrl) {
      // console.log(dataUrl);
      var link = document.createElement('a');
      link.download = orderID + '.jpeg';
      link.href = dataUrl;
      link.click();
    });
};
const png = () => {
  saveAsPng(
    window.document.getElementById('FD'),
    { filename: 'Report', printDate: true },
    {
      backgroundColor: 'rgba(101,198,185,0.5)',
      style: {
        padding: '4px',
        display: 'flex',
        justifyContent: 'center'
      }
    }
  );
};

function OtherLines(props) {
  // console.log(props);
  const products = props.data.data.line;

  function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach(item => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }
  const grouped = groupBy(
    products,
    products => products.supplier_product_group_id
  );

  // const groupByCategory = products;

  // console.log("groupbyCategory", groupByCategory);
  // const entries = Object.entries(groupByCategory);
  // console.log("entries", entries);

  let contentA;

  let contenB = grouped.map((item, index) => {
    // console.log("item", item);
    return (
      <div>
        <h3>name</h3>
        <div>
          {/* {item.map((i, index) => (
            <span>{i.product_name}</span>
          ))} */}
        </div>
      </div>
    );
  });

  let content = props.data.data.line.map((l, index) => {
    const lineTotal = l.price * l.quantity;
    let image = l.product_image
      ? replaceImageUrl(
          l.product_image.split(',')[0].replace('original', 'small')
        )
      : null;
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '6.45px',
          marginTop: '6.45px',
          borderBottom: '1px solid #CFD8DC'
        }}
        key={index}
      >
        <div className={css.imageContainer}>
          <img src={image} alt='product image' />
        </div>
        <div>{l.product_name}</div>
      </div>
    );
  });
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <span
          style={{
            marginLeft: 'auto',
            display: 'inline-block',
            float: 'right',
            color: 'steelblue',
            cursor: 'pointer'
          }}
          // onClick={() => output(foobar, orderData.order_id, orderData.status)}
        >
          EXCEL татах
        </span>
        <span
          // onClick={() => jpg(id, orderData.order_id)}
          style={{
            marginLeft: 'auto',
            marginRight: '1rem',
            display: 'inline-block',
            float: 'right',
            color: 'steelblue',
            cursor: 'pointer'
          }}
        >
          Зураг татах
        </span>
      </div>
      <div>{contenB}</div>
    </div>
  );
}

export default OtherLines;
