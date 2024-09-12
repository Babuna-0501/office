import React, { useState, useEffect } from 'react';
import Product from './Product';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import css from './List.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import myHeaders from '../components/MyHeader/myHeader';

const List = props => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [dummy2, setDummy2] = useState(0);
  const [selected, setSelected] = useState([]);
  const [coSuppliers2, setCoSuppliers2] = useState([]);
  const [productGroup, setProductGroup] = useState([]);
  const [warehouseData, setWarehouseData] = useState([]);

  let searchValue = props.search ? props.search : '';

  // console.log("props products", props.userData.company_id);

  const getProducts = async () => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    let urlNew = '';
    let params = '';
    // let urlNew = `${process.env.REACT_APP_API_URL2}/api/products/get1?supplier=${suppID}&search=${searchValue}&bar_code=${bar_code}&sku=${sku}&product_measure=${productMeasure}&page=${page}&limit=50&id=${productID}`;
    // let urlNew = `${process.env.REACT_APP_API_URL2}/api/products/get1?page=${page}&limit=50`;

    if (
      props.userData.company_id === '|13987|' ||
      props.userData.company_id === '|14006|' ||
      props.userData.company_id === '|13992|' ||
      props.userData.company_id === '|13991|' ||
      props.userData.company_id === '|13994|' ||
      props.userData.company_id === '|13965|' ||
      props.userData.company_id === '|13995|' ||
      props.userData.company_id === '|4805|' ||
      props.userData.company_id === '|10683|' ||
      props.userData.company_id === '|1232|' ||
      props.userData.company_id === '|13990|' ||
      props.userData.company_id === '|13996|' ||
      props.userData.company_id === '|13993|' ||
      props.userData.company_id === '|13997|' ||
      props.userData.company_id === '|13998|' ||
      props.userData.company_id === '|14000|' ||
      props.userData.company_id === '|13999|'
    ) {
      if (props.supplier) {
        params += `supplier=${props.supplier}&`;
      }
      if (props.search) {
        params += `search=${props.search}&`;
      }
      if (props.barcode) {
        params += `bar_code=${props.barcode}&`;
      }
      if (props.sku) {
        params += `sku=${props.sku}&`;
      }
      if (props.productId) {
        params += `id=${props.productId}&`;
      }
      if (props.categorySelected) {
        params += `category=${props.categorySelected}&`;
      }
      if (props.warehouseSelected) {
        params += `ids=${props.warehouseSelected}&`;
      }
      // urlNew = `${process.env.REACT_APP_API_URL2}/api/products/get1?vendor=${props.userData.company_id.replaceAll(
      //   "|",
      //   ""
      // )}&supplier=${suppID}&search=${searchValue}&bar_code=${bar_code}&sku=${sku}&product_measure=${productMeasure}&page=${page}&limit=50`;
      urlNew = `${
        process.env.REACT_API_URL2
      }/products/get1?vendor=${props.userData.company_id.replaceAll(
        '|',
        ''
      )}&${params}page=${page}&limit=50`;
    } else {
      if (props.search) {
        params += `search=${props.search}&`;
      }
      if (props.barcode) {
        params += `bar_code=${props.barcode}&`;
      }
      if (props.vendor) {
        params += `vendor=${props.vendor}&`;
      }
      if (props.sku) {
        params += `sku=${props.sku}&`;
      }
      if (props.productId) {
        params += `id=${props.productId}&`;
      }
      if (props.supplier && window.location.pathname !== '/oresh') {
        params += `supplier=${props.supplier}&`;
      }
      if (props.categorySelected) {
        params += `category=${props.categorySelected}&`;
      }
      if (props.warehouseSelected.productIds.length > 0) {
        params += `ids=[${props.warehouseSelected.productIds.join(',')}]&`;
      }
    }

    if (window.location.pathname === '/oresh') {
      const match = props.userData.company_id.match(/\|(\d+)\|/)[1];
      let coSuppliers = '';
      await fetch(
        `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers?id=${match}`,
        requestOptions
      )
        .then(r => r.json())
        .then(response => {
          let data = response.data;
          let copyCoSuppliers = [];
          data.map(e => {
            copyCoSuppliers.push({ supplierName: e.name, supplierId: e.id });
          });
          setCoSuppliers2(copyCoSuppliers);
          props.setCoSuppliers(copyCoSuppliers);
          coSuppliers = data[data.length - 1].coSupplier;
        })
        .catch(error => {
          console.log('error', error);
        });

      if (coSuppliers && props.suppFilter === 'All') {
        params += `suppliers=${coSuppliers}`;
      } else if (props.suppFilter) {
        params += `suppliers=${props.suppFilter}`;
      }
    }

    urlNew = `${process.env.REACT_APP_API_URL2}/api/products/get1?${params}&page=${page}&limit=50`;

    await fetch(urlNew, requestOptions)
      .then(r => r.json())
      .then(response => {
        let data = response.data;
        setProducts(prev => [...prev, ...response.data]);
        props.setFetchedData(products => products.concat(data));
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const [warehouseall, setWarehouseall] = useState();
  const warehousealls = async () => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let urlNew = `${process.env.REACT_APP_API_URL2}/api/warehouse`;
    await fetch(urlNew, requestOptions)
      .then(r => r.json())
      .then(response => {
        setWarehouseall(response.data);
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  useEffect(() => {
    warehousealls();
  }, []);

  useEffect(() => {
    /*if (warehouseall && warehouseall.length > 0) {
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const warehouse = () => {
        const warehouseIds = warehouseall
          .map((warehouse) => warehouse._id)
          .join(",");
        const url = `${process.env.REACT_APP_API_URL2}/api/warehouse?ids=${warehouseIds}&allProducts=true`;

        fetch(url, requestOptions)
          .then((r) => r.json())
          .then((response) => {
            setWarehouseData(response);
          })
          .catch((error) => console.log("error", error));
      };

      warehouse();
    }*/
  }, [warehouseall]);

  useEffect(() => {
    getProducts();
  }, [
    page,
    searchValue,
    props.barcode,
    props.brands,
    props.sku,
    props.productId,
    dummy2,
    props.butarhai,
    props.categorySelected,
    props.warehouseSelected,
    props.coSuppliers
  ]);
  const removeDuplicates = products.filter(
    (value, index, self) => index === self.findIndex(t => t?._id === value?._id)
  );

  const [zones, setZones] = useState();

  const getZones = async () => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let urlNew = `${process.env.REACT_APP_API_URL2}/api/zones`;
    await fetch(urlNew, requestOptions)
      .then(r => r.json())
      .then(response => {
        setZones(response.data);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    getZones();
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

  return products ? (
    <div id='scrollableDiv' style={{ height: '85vh', overflow: 'auto' }}>
      <InfiniteScroll
        dataLength={products?.length}
        next={() => setPage(prev => prev + 1)}
        hasMore={true}
        loader={
          removeDuplicates?.length === 0 && (
            <div className={css.loading}>
              <LoadingSpinner />
            </div>
          )
        }
        scrollableTarget='scrollableDiv'
      >
        {removeDuplicates.map((product, index) => {
          return (
            <div key={index}>
              <Product
                setDummy2={setDummy2}
                dummy2={dummy2}
                warehouseData={warehouseData}
                index={index}
                data={product}
                brands={props.brands}
                suppliers={props.suppliers}
                userData={props.userData}
                categories={props.categories}
                business_types={props.business_types}
                zones={zones}
                app={props.app}
                // setSelected={props.setSelected}
                // selected={props.selected}
                selected={selected}
                setSelected={setSelected}
                setSelectedProduct={props.setSelectedProduct}
                appctx={props.appctx}
                safeDecent={props.safeDecent}
                coSuppliers={coSuppliers2}
                productGroup={productGroup}
              />
            </div>
          );
        })}
        <div style={{ height: '120px' }}></div>
      </InfiniteScroll>
      <div style={{ marginTop: '1rem' }}></div>
    </div>
  ) : null;
};

export default List;
