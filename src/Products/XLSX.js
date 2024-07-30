import React, { useState, useEffect, useContext } from 'react';
import CSV from './CSV';
import ProductReportHook from '../Hooks/ProductsReportHook';
import LoadingSpinner from '../components/Spinner/Spinner';

function XLSX(props) {
  const [supplier, setSupplier] = useState(props.suppValue);
  const [loading, setLoading] = useState(false);

  let [blah, setBlah] = useState([
    [
      'id',
      'show',
      'supplier',
      'name',
      'general_category',
      'category',
      'description',
      'barcode',
      'brand',
      'sku',
      'price',
      'stock',
      'proper_stock',
      'safe_stock',
      'in_case',
      'product_measure'
    ]
  ]);
  const productsCtx = useContext(ProductReportHook);

  const fetchProduct = (supplier_id, isAll) => {
    console.log('supplier_id', supplier_id);
    setLoading(true);

    var myHeaders = new Headers();
    myHeaders.append(
      'ebazaar_token',
      localStorage.getItem('ebazaar_admin_token')
    );
    myHeaders.append('Content-Type', 'application/json');
    var requestOptions = {
      method: 'GET',
      headers: myHeaders
    };
    // let url = `${process.env.REACT_APP_API_URL2}/api/products/get1?supplier=${
    //   supplier_id === 1 ? "" : supplier_id
    // }`;
    let url = `${process.env.REACT_APP_API_URL2}/api/products/get1`;
    if (supplier_id)
      if (supplier_id === 1) {
        if (window.confirm('Бүх барааны тайлан татах уу?')) {
          url = `${process.env.REACT_APP_API_URL2}/api/products/get1`;
        } else {
          url = `${process.env.REACT_APP_API_URL2}/api/products/get1?supplier=13884`;
        }
      } else {
        url = `${process.env.REACT_APP_API_URL2}/api/products/get1?page=all&supplier=${supplier_id}`;
      }

    console.log('product report url', url);
    fetch(url, requestOptions)
      .then(r => r.json())
      .then(res => {
        console.log('res.data++++++бүтээгдэхүүн', res.data);

        if (res.data.length === 0) {
          alert('Мэдээлэл байхгүй байна');
          return;
        }
        let data = [];
        res.data.map(e => {
          let description = e.description;

          let div = document.createElement('div');
          div.innerHTML = description;
          let text = div.textContent || div.innerText || '';
          text = text.replace(/[\s,"]+/g, '');

          let name = e.name;
          let general_category = {};

          let category;
          let supplier;
          function convertToPlain(html) {
            var tempDivElement = document.createElement('div');
            tempDivElement.innerHTML = html;
            return tempDivElement.textContent || tempDivElement.innerText || '';
          }
          if (props.categories) {
            props.categories.map(cat => {
              if (cat.id === parseInt(e.category_id)) {
                category = cat.name;
                general_category = cat;
              }
            });
          }

          function recurse() {
            if (general_category['parent_id'] !== 0) {
              props.categories.map(item => {
                if (
                  item.id === general_category['parent_id'] &&
                  general_category.parent_id !== 0
                ) {
                  general_category = item;
                  recurse();
                }
              });
            } else if (general_category['parent_id'] === 0) {
              return;
            }
          }
          recurse();
          // console.log("general_category", general_category);

          if (props.suppliers) {
            props.suppliers.map(sup => {
              if (sup.id === parseInt(e.supplier_id)) {
                supplier = sup.name;
              }
            });
          }

          name = convertToPlain(name);

          data.push({
            id: e._id,
            show:
              e.locations?.['62f4aabe45a4e22552a3969f']?.is_active?.channel?.[
                '1'
              ] === 0
                ? 'Хаалттай'
                : 'Нээлттэй',
            supplier: supplier,
            general_category: general_category.name,
            name: name.replace(/[,"]/g, ''),
            category: category ? category : '.',
            // description: description.replaceAll(",", ".").toString().trim(),
            description: text,
            barcode: e.bar_code,
            brand: e.brand,
            sku: e.sku,
            price:
              e.locations?.['62f4aabe45a4e22552a3969f']?.price?.channel?.['1'],
            stock: e.stock,
            proper_stock: e.proper_stock,
            safe_stock: e.safe_stock,
            in_case:
              e.locations?.['62f4aabe45a4e22552a3969f']?.in_case?.channel?.[
                '1'
              ],

            product_measure: e.product_measure ? e.product_measure : 'Байхгүй'
          });
        });
        setBlah(data);
        setLoading(false);
      })
      .catch(error => {
        console.log('error collection', error);
      });
  };

  useEffect(() => {
    if (props.suppValue) {
      fetchProduct(supplier);
    } else if (props.suppValue === undefined) {
      fetchProduct(props.company_id);
    }
  }, []);

  const clickHandler = () => {
    productsCtx?.setMassExport(false);
  };
  return (
    <div id='formwithtransparentbackground'>
      <div id='form'>
        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%'
            }}
          >
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <span id='close' onClick={clickHandler}>
              Close
            </span>
            <CSV data={blah} />
          </>
        )}
      </div>
      <div id='transparentbackground'></div>
    </div>
  );
}

export default XLSX;
