import React, { useState, useEffect } from 'react';
import CSV from './CSV';
import writeXlsxFile from 'write-excel-file';

const schema = [
  {
    column: 'Order number',
    type: String,
    value: d => d.OrderID
  },
  {
    column: 'Product name',
    type: String,
    value: d => d.ProductName
  },
  {
    column: 'Barcode',
    type: String,
    value: d => d.Barcode
  },
  {
    column: 'Merchant Sku',
    type: String,
    value: d => d.SKU
  }
];

const objects = [
  {
    OrderID: '',
    ProductName: '',
    Barcode: '',
    SKU: ''
  }
];

const output = () => {
  // console.log("excel");
  writeXlsxFile(objects, {
    schema, // (optional) column widths, etc.
    fileName: 'file.xlsx'
  });
};

function Report(props) {
  let [data, setData] = useState(true);
  let [preparing, setPreparing] = useState(false);
  let [foo, setFoo] = useState(false);
  let locations = props.locations;
  let categories = props.categories;
  let csv = [
    [
      'Order number',
      'Product name',
      'Barcode',
      'Merchant Sku',
      'Brand',
      'Vendor',
      'Qty',
      'Price',
      'Total',
      'Taken',
      'Canceled',
      'Returned',
      'Final total',
      'Completed at',
      'When to ship',
      'Paid at',
      'Shipped at',
      'Receiver phone',
      'Receiver info',
      'Receiver name',
      'Branch',
      'Business type',
      'State name',
      'District',
      'Quarter',
      'Address',
      'Latest note',
      'Status',
      'Reason',
      'Main category',
      'Sub-category',
      'Sub-Sub-category',
      'Original total'
    ]
  ];
  let [blah, setBlah] = useState(csv);
  const getCategories = categoryId => {
    let cats = {
      main: '',
      sub: '',
      subsub: ''
    };
    categories.map(category => {
      if (category.id === categoryId) {
        if (category.parent_id === 0) {
          cats['main'] = category['name'];
        } else {
          let parent = category.parent_id;
          categories.map(categoryParent => {
            if (categoryParent.id === category.parent_id) {
              if (categoryParent.id === 0) {
                cats['main'] = categoryParent['name'];
                cats['sub'] = category['name'];
              } else {
                categories.map(categoryParentParent => {
                  if (categoryParentParent.id === categoryParent.parent_id) {
                    cats['main'] = categoryParentParent['name'];
                    cats['sub'] = categoryParent['name'];
                    cats['subsub'] = category['name'];
                  }
                });
              }
            }
          });
        }
      }
    });
    return cats;
  };
  const exporter = () => {
    let locations = props.locations;
    const date_start = document.getElementById('date_start');
    const date_end = document.getElementById('date_end');
    const borderColor = document.getElementById('date_start').style.borderColor;
    date_start.style.borderColor =
      date_start.value === '' ? 'red' : borderColor;
    date_end.style.borderColor = date_end.value === '' ? 'red' : borderColor;
    if (date_start.value === '' || date_end.value === '') {
      setTimeout(() => {
        date_start.style.borderColor = borderColor;
        date_end.style.borderColor = borderColor;
      }, 2000);
      return;
    } else {
      var myHeaders = new Headers();
      myHeaders.append(
        'ebazaar_token',
        localStorage.getItem('ebazaar_admin_token')
      );
      myHeaders.append('Content-Type', 'application/json');
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch(
        `${process.env.REACT_APP_API_URL2}/api/orders?order_type=1&start=${date_start.value}&end=${date_end.value}&page=all`,
        requestOptions
      )
        .then(r => r.json())
        .then(response => {
          let csv = [];
          response.data.map(order => {
            const orderId = order.order_id;
            const supplierName = order.supplier_name;
            const customerPhone = order.phone;
            const customerAddress = order.address;
            const createdDate = order.order_date
              ? order.order_date.substr(0, 10)
              : '';
            const shippingDate = order.delivery_date
              ? order.delivery_date.substr(0, 10)
              : '';
            let note = '';
            let city = '';
            let khoroo = '';
            let district = '';
            locations.map(location => {
              if (
                location.location_id == parseInt(order.tradeshop_district, 10)
              ) {
                district = location.location_name;
              }
            });
            locations.map(location => {
              if (location.location_id == parseInt(order.tradeshop_horoo, 10)) {
                khoroo = location.location_name;
              }
            });
            locations.map(location => {
              if (location.location_id == parseInt(order.tradeshop_city, 10)) {
                city = location.location_name;
              }
            });
            try {
              note = JSON.parse(order.description)[
                JSON.parse(order.description).length - 1
              ].body;
            } catch (e) {}
            let lines = [];
            let rawTotal = 0;
            if (JSON.parse(order.raw_order)) {
              JSON.parse(order.raw_order).map(ro => {
                rawTotal =
                  rawTotal + parseInt(ro.Quantity, 10) * parseInt(ro.Price, 10);
              });
            }
            if (order.line && order.line.length > 0) {
              order.line.map(line => {
                let cat = getCategories(parseInt(line.product_type_id, 10));
                let temp = [
                  orderId,
                  line.product_name.replaceAll(',', ''),
                  line.product_bar_code,
                  line.product_sku,
                  '',
                  supplierName,
                  line.quantity,
                  line.price,
                  line.quantity * line.price,
                  '',
                  '',
                  '',
                  line.quantity * line.price,
                  createdDate,
                  shippingDate,
                  '',
                  '',
                  customerPhone,
                  order.register,
                  order.business_name ? order.business_name : '',
                  order.tradeshop_name,
                  'business type',
                  city,
                  district,
                  khoroo,
                  order.address,
                  note,
                  '',
                  '',
                  cat['main'],
                  cat['sub'],
                  cat['subsub'],
                  rawTotal
                ];
                csv.push(temp);
              });
            } else {
              if (JSON.parse(order.raw_order)) {
                JSON.parse(order.raw_order).map(ro => {
                  let cat = getCategories(parseInt(ro.product_type_id, 10));
                  let temp = [
                    orderId,
                    ro.ProductID,
                    'n/a',
                    'n/a',
                    '',
                    supplierName,
                    ro.Quantity,
                    ro.Price,
                    'n/a',
                    '',
                    '',
                    '',
                    'n/a',
                    createdDate,
                    shippingDate,
                    '',
                    '',
                    customerPhone,
                    order.register,
                    order.business_name ? order.business_name : '',
                    order.tradeshop_name,
                    'business type',
                    city,
                    district,
                    khoroo,
                    order.address,
                    note,
                    '',
                    '',
                    cat['main'],
                    cat['sub'],
                    cat['subsub'],
                    rawTotal
                  ];
                  csv.push(temp);
                });
              }
            }
          });
          // console.log(csv);
        });
    }
  };
  useEffect(() => {
    //getOrders()
  }, []);
  const prepare = () => {
    setPreparing(true);
  };
  let renderHTML =
    foo && data && blah.length > 1 ? (
      <>
        <CSV data={blah} />
      </>
    ) : (
      <>
        <span id='close' onClick={() => props.close(false)}>
          Close
        </span>
        <div>
          <label>Эхлэх огноо</label>
          <input type='date' className='dateselect' id='date_start' />
        </div>
        <div>
          <label>Эхлэх огноо</label>
          <input type='date' className='dateselect' id='date_end' />
        </div>
        <div className='margintop1rem'>
          <span className='btn-tech' onClick={() => exporter()}>
            Тайлан бэлтгэх
          </span>
        </div>
      </>
    );
  return (
    <div id='formwithtransparentbackground'>
      <div id='form'>{renderHTML}</div>
      <div id='transparentbackground'></div>
    </div>
  );
}

export default Report;

/*const schema = [
  {
    column: 'Order number',
    type: String,
    value: d => d.name
  },
  {
    column: 'Date of Birth',
    type: Date,
    format: 'mm/dd/yyyy',
    value: d => d.dateOfBirth
  },
  {
    column: 'Cost',
    type: Number,
    format: '#,##0.00',
    value: d => d.cost
  },
  {
    column: 'Paid',
    type: Boolean,
    value: d => d.paid
  }
]*/
