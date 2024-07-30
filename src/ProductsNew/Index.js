import { useState, useContext, useEffect } from 'react';
import myHeaders from '../components/MyHeader/myHeader';
import List from './List';
import Header from './Header';
import Form from './Form';
import AppHook from '../Hooks/AppHook';
import MassChannelPrice from './MassChannelPrice';
import Sidebar from './Component/sidebar/sidebar';
import Total from './Component/Footer/Footer';
import MassImport from './MassImport';
import TabsProduct from './Component/Tab/Tab';
import readXlsxFile from 'read-excel-file';
const Index = props => {
  const appContext = useContext(AppHook);
  const [data, setData] = useState([]);
  const [customers, setCustomers] = useState(null);
  const [tab, setTab] = useState('products');
  const [product, setProduct] = useState(null);
  const [productGroups, setProductGroups] = useState(null);
  const [attributes, setAttributes] = useState(null);
  const [page, setPage] = useState(1);
  const [supplierUsers, setSupplierUsers] = useState(null);
  const [massChannelPrice, setMassChannelPrice] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [massImportData, setMassImportData] = useState(null);
  const [productGroup, setProductGroup] = useState();
  useEffect(() => {
    fetchSiteData();
    fetchAttributes();
    fetchCustomerData();
  }, []);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/backoffice/newsuppliers?id=13884`,
      {
        method: 'GET',
        headers: myHeaders
      }
    )
      .then(res => res.json())
      .then(response => {
        if (response?.ProductGroups) {
          setProductGroup(JSON.parse(response?.ProductGroups));
        }
      });
  }, []);

  const widths = [50, 100, 300, 50, 200, 200, 200, 200, 200, 200, 200, 200];
  const totalWidth = widths.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  let [state, setState] = useState({
    supplier: null,
    suppliers: []
  });
  useEffect(() => {
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
    fetch(`${process.env.REACT_APP_API_URL2}/api/suppliers/get`, requestOptions)
      .then(r => r.json())
      .then(response => {
        setState({ ...state, suppliers: response.data });
      })
      .catch(error => console.log('error', error));
  }, []);

  const fetchCustomerData = () => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    const url = `${process.env.REACT_APP_API_URL2}/api/merchants?page=all`;
    fetch(url, requestOptions)
      .then(r => r.json())
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    const url = `${process.env.REACT_APP_API_URL2}/api/backoffice/users`;
    fetch(url, requestOptions)
      .then(r => r.json())
      .then(response => {
        setSupplierUsers(response.data);
      });
  }, []);

  const fetchSiteData = () => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    const url =
      `${process.env.REACT_APP_API_URL2}/api/productgroup/get?supplier=` +
      parseInt(appContext.userData.company_id.match(/(\d+)/)[0]);
    fetch(url, requestOptions)
      .then(r => r.json())
      .then(response => {
        setProductGroups(response);
      });
  };

  const fetchAttributes = () => {
    const url = `${process.env.REACT_APP_API_URL2}/product/sub_attributes`;
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(url, requestOptions)
      .then(r => r.json())
      .then(response => {
        setAttributes(response.data[0]);
      });
  };
  const foobar = e => {
    const schema = {
      price: {
        prop: 'price',
        type: Number
      },
      barcode: {
        prop: 'barcode',
        type: String
      },
      sku: {
        prop: 'sku',
        type: String
      },
      name: {
        prop: 'name',
        type: String
      },
      description: {
        prop: 'description',
        type: String
      }
    };

    readXlsxFile(e.target.files[0], { schema }).then(rows => {
      setMassImportData(rows);
    });
    console.log(data);
  };
  const readExcel = () => {
    const id = (
      Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
    ).toUpperCase();
    document
      .getElementById('root')
      .insertAdjacentHTML(
        'beforeEnd',
        '<form method="post" enctype="multipart/form‐data" id="' +
          id +
          '" name=' +
          id +
          '><input type="file" id="read" /></form>'
      );

    document.getElementById('read').click();
    document.getElementById('read').addEventListener(
      'change',
      () => {
        const schema = {
          price: {
            prop: 'price',
            type: Number
          },
          barcode: {
            prop: 'barcode',
            type: String
          },
          active: {
            prop: 'active',
            type: String
          },
          sku: {
            prop: 'sku',
            type: String
          },
          name: {
            prop: 'name',
            type: String
          },
          description: {
            prop: 'description',
            type: String
          },
          incase: {
            prop: 'incase',
            type: Number
          },
          stock: {
            prop: 'stock',
            type: Number
          },
          proper_stock: {
            prop: 'proper_stock',
            type: String
          },
          city_tax: {
            prop: 'city_tax',
            type: String
          },
          safe_stock: {
            prop: 'safe_stock',
            type: String
          },
          supplier_minimum_order_amount: {
            prop: 'supplier_minimum_order_amount',
            type: String
          },
          minimum_order_quantity: {
            prop: 'minimum_order_quantity',
            type: String
          },
          pick_date: {
            prop: 'pick_date',
            type: String
          },
          brand: {
            prop: 'brand',
            type: String
          },
          category: {
            prop: 'category',
            type: String
          },
          subCategory: {
            prop: 'subCategory',
            type: String
          },
          alcohol: {
            prop: 'alcohol',
            type: String
          },
          product_measure: {
            prop: 'product_measure',
            type: String
          },
          storage_day: {
            prop: 'storage_day',
            type: String
          },
          product_weigth: {
            prop: 'product_weigth',
            type: String
          },
          slug: {
            prop: 'slug',
            type: String
          },
          priority: {
            prop: 'priority',
            type: Number
          },
          shuurhaicat: {
            prop: 'shuurkhaicat',
            type: String
          },

          form: {
            prop: 'form',
            type: String
          },
          packActual: {
            prop: 'packActual',
            type: String
          },
          packSale: {
            prop: 'packSale',
            type: String
          },
          region: {
            prop: 'region',
            type: String
          },
          organization: {
            prop: 'organization',
            type: String
          },
          supplier: {
            prop: 'supplier',
            type: String
          },
          storageCondition: {
            prop: 'storageCondition',
            type: String
          },
          quantity: {
            prop: 'quantity',
            type: String
          },
          unitPrice: {
            prop: 'unitPrice',
            type: String
          },
          seriesNumber: {
            prop: 'seriesNumber',
            type: String
          },
          wholePrice: {
            prop: 'wholePrice',
            type: String
          }
        };
        readXlsxFile(document.getElementById('read').files[0], {
          schema
        }).then(rows => {
          setMassImportData(rows);
        });
      },
      false
    );
  };

  const tabs = [
    {
      label: 'Бүтээгдэхүүний жагсаалт',
      content: (
        <>
          <div className='containerPageButtons productv2'>
            <button className='pageButton' style={{ marginRight: '5px' }}>
              Жагсаалтын багана солих
            </button>
            <button className='pageButton' onClick={() => setProduct('new')}>
              + Шинэ бүтээгдэхүүн
            </button>
          </div>
          <div className='product_page_list' style={{ display: 'flex' }}>
            <Sidebar onClick={e => setSelectedSupplier(e)} />
            <List
              setPage={setPage}
              suppliers={selectedSupplier}
              data={data}
              setData={setData}
              widths={widths}
              totalWidth={totalWidth}
              setProduct={setProduct}
              page={page + 1}
              attributes={attributes}
              productGroups={productGroups}
              supplierUsers={supplierUsers}
            />
          </div>
          {product ? (
            <Form
              setProduct={setProduct}
              product={product}
              supplierId={parseInt(
                appContext.userData.company_id.match(/(\d+)/)[0]
              )}
              customers={customers}
              productGroups={productGroups}
              attributes={attributes}
            />
          ) : null}
          {massChannelPrice ? (
            <MassChannelPrice setMassChannelPrice={setMassChannelPrice} />
          ) : null}
          {/* {productMassImport ? (
            // <MassImport setProductMassImport={setProductMassImport} />
            <p>mass</p>
          ) : null} */}

          <Total data={data} setData={setData} />
        </>
      )
    },
    {
      label: 'Масс тохиргоо',
      content: (
        <div>
          <div>
            <button className='pageButton secondary marginleft1rem'>
              Export
            </button>

            <button
              className='pageButton secondary marginleft1rem'
              onClick={() => {
                readExcel();
              }}
            >
              Бүтээгдэхүүн масс импортлох
            </button>
            <button className='pageButton secondary'>
              Бүтээгдэхүүний тайлан
            </button>
            <button
              className='pageButton secondary'
              onClick={() => setMassChannelPrice(true)}
            >
              Масс сувгийн үнийн тохиргоо
            </button>
          </div>
          {massImportData ? (
            <MassImport

              data={massImportData}
              setMassImportData={setMassImportData}
              suppliers={state.suppliers}
              pageData={props}
              productGroup={productGroup}
            />
          ) : null}
        </div>
      )
    },
    {
      label: 'Ерөнхий тохиргоо',
      content: (
        <div>
          <button className='pageButton secondary marginleft1rem'>
            Ангилалын тохиргоо
          </button>
          <button className='pageButton secondary marginleft1rem'>
            Брэндийн тохиргоо
          </button>
          <button className='pageButton secondary'>Эрэмбийн тохиргоо</button>
          <button className='pageButton secondary'>
            Мерчант АПП Эрэмбийн тохиргоо
          </button>
        </div>
      )
    }
  ];

  return attributes && supplierUsers && customers ? (
    <div className='ProductNew'>
      <Header tab={tab} setTab={setTab} />
      <TabsProduct tabs={tabs} />
    </div>
  ) : (
    <div>Түр хүлээнэ үү...</div>
  );
};

export default Index;
