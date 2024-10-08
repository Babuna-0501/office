import List from './List';
import { useEffect, useState } from 'react';
import myHeaders from '../../components/MyHeader/myHeader';
import Sale from './Sale';
import Total from './Total';
//import WarehouseSelector from './WarehouseSelector'

const FormattedDate = () => {
  let currentDate = new Date();
  const year = currentDate.getFullYear();
  const month =
    currentDate.getMonth() + 1 < 10
      ? '0' + (currentDate.getMonth() + 1)
      : currentDate.getMonth() + 1;
  const day =
    currentDate.getDate() < 10
      ? '0' + currentDate.getDate()
      : currentDate.getDate();
  return {
    currentDate: year + '-' + month + '-' + day,
    year: year,
    month: month,
    day: day
  };
};

const Sales = props => {
  const [warehouses, setWarehouses] = useState(null);
  const [warehouse, setWarehouse] = useState(null);
  const [products, setProducts] = useState(null);
  const [data, setData] = useState(null);
  const [sale, setSale] = useState(false);
  const [openingSaleData, setOpeningSaleData] = useState(null);
  let foo = FormattedDate();
  const [startDate, setStartDate] = useState(
    foo['year'] + '-' + foo['month'] + '-' + '01'
  );
  const [endDate, setEndDate] = useState(foo['currentDate']);
  const functionalKeys = e => {
    if (e.code === 'F8') {
      setSale(sale === false ? 1 : false);
    }
  };
  useEffect(
    () => document.addEventListener('keydown', functionalKeys, true),
    []
  );
  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    let url = `${process.env.REACT_APP_API_URL2}/api/warehouse?allProducts=true&id=${props.warehouse}&series=true`;
    fetch(url, requestOptions)
      .then(r => r.json())
      .then(response => {
        setProducts(response.data[0].products);
      });
  }, []);
  // Previous sales block
  const [sales, setSales] = useState([]);
  const [datas, setDatas] = useState(false);
  const fetchData = () => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    let url = `${process.env.REACT_APP_API_URL2}/api/shipment?type=2&from=${props.warehouse}&startDate=${startDate}&endDate=${endDate}&products=true&createdDate=true`;
    fetch(url, requestOptions)
      .then(r => r.json())
      .then(response => {
        let temp =
          localStorage.getItem('draftsale') &&
          JSON.parse(localStorage.getItem('draftsale'))[props.warehouse]
            ? JSON.parse(localStorage.getItem('draftsale'))[props.warehouse]
            : [];
        response.data.map(sale => {
          temp.push(sale);
        });
        setSales(temp);
        setDatas(true);
      });
  };
  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);
  // Previous sales block
  const saveDraft = draft => {
    let temp = sales;
    temp.unshift(draft);
    setSales(temp);
    setSale(false);
    setOpeningSaleData(null);
  };
  const openSale = data => {
    setOpeningSaleData(data);
    setSale('open');
  };
  const openDraft = data => {
    setOpeningSaleData(data);
    setSale('draft');
  };
  const removeDraft = id => {
    let drafts = JSON.parse(localStorage.getItem('draftsale'));
    let temp = [];
    drafts.map(draft => {
      if (draft._id !== id) {
        temp.push(draft);
      }
    });
    localStorage.setItem('draftsale', JSON.stringify(temp));
    if (document.getElementById(id)) {
      fetchData();
    }
  };
  const handleSave = () => {
    //setSale(false)
    //fetchData()
  };
  const cancel = () => {
    setSale(false);
    setOpeningSaleData(null);
  };
  const clear = () => {
    setSale(false);
    setOpeningSaleData(null);
  };
  const newSale = () => {
    //document.getElementById('overlaypage_bg').remove()
    fetchData();
    setOpeningSaleData(null);
    setSale(false);
    setSale(true);
  };
  return products ? (
    <>
      {sale ? (
        <Sale
          handleSave={handleSave}
          cancel={cancel}
          newSale={newSale}
          setSale={clear}
          sale={sale}
          products={products}
          saveDraft={saveDraft}
          openingSaleData={openingSaleData}
          warehouses={props.warehouses}
          warehouse={props.warehouse}
          removeDraft={removeDraft}
          key={Math.random()}
        />
      ) : null}
      {datas ? (
        <List
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          startDate={startDate}
          endDate={endDate}
          setSale={setSale}
          warehouse={props.warehouse}
          data={sales}
          key={Math.random()}
          openSale={openSale}
          openDraft={openDraft}
          supplierUsers={props.supplierUsers}
        />
      ) : null}
      {datas ? <Total data={sales} key={Math.random()} /> : null}
    </>
  ) : null;
};

export default Sales;
