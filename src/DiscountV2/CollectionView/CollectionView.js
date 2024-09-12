import React, { useState, useContext, useEffect, useMemo } from 'react';
import PromoHook from '../../Hooks/PromoHook';
import myHeaders from '../HeaderContent/HeaderContent';

import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';

import css from './collectionview.module.css';

const CollectionView = () => {
  const [data, setData] = useState([]);
  const promoctx = useContext(PromoHook);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: '_id',
      headerName: 'ID',
      checkboxSelection: true,
      headerCheckboxSelection: true
    },
    {
      field: 'name',
      headerName: 'Багцын нэр',
      autoHeight: true
    },
    {
      field: 'product_id',
      headerName: 'Бүтээгдэхүүний ID',
      autoHeight: true
    },
    {
      field: 'sku',
      headerName: 'SKU',
      autoHeight: true
    },
    {
      field: 'supplier',
      headerName: 'Нийлүүлэгч ID',
      autoHeight: true
    }
  ]);
  // promoctx.setSelectedCollection(e.target.value);

  const FetchSingleData = () => {
    let url = `${process.env.REACT_APP_API_URL2}/api/collection/get?id=${promoctx.selectedCollection}`;
    fetch(url, { method: 'GET', headers: myHeaders })
      .then(r => r.json())
      .then(res => {
        // console.log("response collection single", res);
        promoctx.setCollectionProduct(res.data);
        setData(res.data);
      })
      .catch(error => {
        console.log('Error single collection', error);
      });
  };

  useEffect(() => {
    FetchSingleData();
  }, [promoctx.selectedCollection]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      filter: true,
      resizable: true,
      sortable: true,
      filterParams: {
        buttons: ['reset', 'apply'],
        debounceMs: 500
      },
      floatingFilter: true
    };
  }, []);
  const defaultRow = {
    height: 60,
    display: 'flex',
    alignItems: 'center'
  };

  return (
    <div className={css.container}>
      <div
        className='ag-theme-alpine'
        style={{ width: '100%', height: '20vh' }}
      >
        <AgGridReact
          rowData={data} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef}
          rowHeight={defaultRow}
        />
      </div>
    </div>
  );
};

export default CollectionView;
