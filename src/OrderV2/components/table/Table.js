import React, { useEffect, useState } from 'react';
import { useTable, useRowSelect } from 'react-table';
import InfiniteScroll from 'react-infinite-scroll-component';
import './table.css';
import {
  Checkbox,
  findLocation,
  formatCurrency,
  formatDate,
  getBusinessTypeName,
  replaceUrlParam
} from '../utils';
import { LoadingSpinner } from '../../../components/common';
import ProductAvatar from '../productImg/productImg';
import { getColorForStatus } from '../color';
import { originData, paymentMethods } from './constants';
import myHeaders from '../MyHeader/myHeader';
import DatePick from '../datepick/datepick';

function Table({
  columns,
  data,
  update,
  setSelectedRows,
  setShowOrderDetail,
  setParams,
  setPage,
  params,
  setFilterLoading,
  filterLoading,
  scrollLoading,
  changeDeliveryDate,
  setOpennedRowData
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds }
  } = useTable(
    {
      columns,
      data
    },
    useRowSelect,
    hooks => {
      hooks.columns.push(column => [
        {
          id: 'selection',
          parameter: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => {
            return <Checkbox {...row.getToggleRowSelectedProps()} />;
          }
        },
        ...columns,
        {
          id: 'delete',
          parameter: 'delete',
          Cell: ({ row }) => {
            return (
              <button
                className='delete_order'
                onClick={() => orderDeleteHandler(row.original.order_id)}
              >
                Устгах
              </button>
            );
          }
        }
      ]);
    }
  );

  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setParams(query);
    }, 1500);

    return () => {
      clearTimeout(timeOutId);
      setFilterLoading(true);
    };
  }, [query]);

  useEffect(() => {
    setSelectedRows(selectedFlatRows);
  }, [selectedRowIds]);

  const handleOnChange = (value, column) => {
    const { parameter } = column;

    const newUrlParam = replaceUrlParam(params, parameter, value);

    setPage(1);
    setQuery(newUrlParam);
  };

  const orderDeleteHandler = async order_id => {
    try {
      const confirmed = window.confirm(
        'Та энэ захиалгыг устгахдаа итгэлтэй байна уу?'
      );

      if (!confirmed) {
        return;
      }

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
          order_id: parseInt(order_id)
        }),
        redirect: 'follow'
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_URL2}/api/order/datechange`,
        requestOptions
      );

      const result = await response.json();

      if (result.code === 200) {
        alert('Амжилттай устгалаа.');
      } else {
        alert('Алдаа гарлаа.');
      }
    } catch (error) {
      console.log('Error deleting order:', error);
      alert('Алдаа гарлаа.');
    }
  };

  const onClick = (row, columnId) => {
    if (columnId === 'selection' || columnId === 'delete') {
      setShowOrderDetail(false);
    } else {
      setShowOrderDetail(true);
      setOpennedRowData(row?.original);
    }
  };

  const renderHeaderInputs = column => {
    if (column.id === 'selection' || column.id === 'delete') {
      return null;
    }

    if (column.type === 'select') {
      return (
        <select
          className='table-header-select'
          defaultValue={''}
          onChange={e => handleOnChange(e.target.value, column)}
        >
          {column.selectOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (column.type === 'date-picker') {
      return (
        <DatePick
          style={{ height: '24px' }}
          handleChange={e => handleOnChange(e.target.value, column)}
        />
      );
    }

    return (
      <input
        className='table-header-input'
        disabled={!column.isFilter}
        onChange={e => handleOnChange(e.target.value, column)}
      />
    );
  };

  return (
    <InfiniteScroll
      dataLength={rows.length}
      next={update}
      hasMore={true}
      scrollableTarget='scrollableDiv'
    >
      <div id='scrollableDiv'>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => {
                  return (
                    <th {...column.getHeaderProps()} id={column.parameter}>
                      <div>
                        {column.render('Header')}
                        {renderHeaderInputs(column)}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          {!filterLoading && data && data.length > 0 && (
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);

                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      if (cell.column.id === 3) {
                        const { color, name, fontColor } = getColorForStatus(
                          cell.value
                        );

                        return (
                          <td
                            id={cell.column.parameter}
                            {...cell.getCellProps()}
                            onClick={() => onClick(row)}
                          >
                            <div
                              className='order-status-bar'
                              style={{
                                backgroundColor: color,
                                color: fontColor
                              }}
                            >
                              {name}
                            </div>
                          </td>
                        );
                      }

                      if (cell.column.id === 4) {
                        return (
                          <td
                            id={cell.column.parameter}
                            {...cell.getCellProps()}
                            onClick={() => onClick(row)}
                          >
                            <ProductAvatar data={cell.value} />
                          </td>
                        );
                      }

                      if (cell.column.id === 5 || cell.column.id === 6) {
                        const showTime = cell.column.id === 6 ? true : false;

                        return (
                          <td
                            id={cell.column.parameter}
                            {...cell.getCellProps()}
                            onClick={() =>
                              showTime ? changeDeliveryDate(row) : onClick(row)
                            }
                            className='text-center'
                          >
                            {formatDate(cell.value, showTime)}
                          </td>
                        );
                      }

                      if (cell.column.id === 7 || cell.column.id === 8) {
                        return (
                          <td
                            id={cell.column.parameter}
                            {...cell.getCellProps()}
                            onClick={() => onClick(row)}
                            className='text-right'
                            style={{
                              color: cell.column.id === 7 ? 'black' : '#8dc543'
                            }}
                          >
                            {formatCurrency(cell.value)}₮
                          </td>
                        );
                      }

                      if (cell.column.id === 9) {
                        return (
                          <td
                            id={cell.column.parameter}
                            {...cell.getCellProps()}
                            onClick={() => onClick(row)}
                          >
                            {paymentMethods[cell.value]?.label || '--'}
                          </td>
                        );
                      }

                      if (cell.column.id === 11) {
                        let notes;

                        try {
                          notes = JSON.parse(cell.value);
                        } catch (e) {
                          notes = [];
                        }

                        return (
                          <td
                            id={cell.column.parameter}
                            {...cell.getCellProps()}
                            onClick={() => onClick(row)}
                          >
                            <div className='note'>
                              {notes?.map((note, index) => {
                                return <p key={index}>{note?.body || '--'}</p>;
                              })}
                            </div>
                          </td>
                        );
                      }

                      if (cell.column.id === 14) {
                        return (
                          <td
                            id={cell.column.parameter}
                            {...cell.getCellProps()}
                            onClick={() => onClick(row)}
                          >
                            {getBusinessTypeName(cell.value)}
                          </td>
                        );
                      }

                      if (
                        cell.column.id === 15 ||
                        cell.column.id === 16 ||
                        cell.column.id === 17
                      ) {
                        return (
                          <td
                            id={cell.column.parameter}
                            {...cell.getCellProps()}
                            onClick={() => onClick(row)}
                            className='text-center'
                          >
                            {findLocation(cell.value)}
                          </td>
                        );
                      }

                      if (cell.column.id === 18) {
                        return (
                          <td
                            id={cell.column.parameter}
                            {...cell.getCellProps()}
                            onClick={() => onClick(row)}
                          >
                            <div className='address'>{cell.value}</div>
                          </td>
                        );
                      }

                      if (cell.column.id === 20) {
                        const origin = originData.find(
                          item => cell.value && item.value === cell.value
                        );

                        return (
                          <td
                            id={cell.column.parameter}
                            {...cell.getCellProps()}
                            onClick={() => onClick(row)}
                          >
                            {origin?.label}
                          </td>
                        );
                      }

                      if (cell.column.id === 22 || cell.column.id === 23) {
                        const employee_id =
                          cell.column.id === 23
                            ? cell.row.original.deliveryman_id
                            : cell.row.original.salesman_id;

                        const deliveryMan = cell.column.selectOptions.find(
                          man => man.value === employee_id
                        );

                        return (
                          <td
                            id={cell.column.parameter}
                            {...cell.getCellProps()}
                            onClick={() => onClick(row)}
                            className='text-center'
                          >
                            {deliveryMan?.value} / {deliveryMan?.label}
                          </td>
                        );
                      }

                      return (
                        <td
                          id={cell.column.parameter}
                          {...cell.getCellProps()}
                          onClick={() => onClick(row, cell.column.id)}
                          className='text-center'
                        >
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>

        {filterLoading ? (
          <div className='tab-loader'>
            <LoadingSpinner />
          </div>
        ) : (
          !data ||
          (data.length === 0 && (
            <div className='empty'>Жагсаалт хоосон байна</div>
          ))
        )}

        {scrollLoading && data && data.length > 0 && (
          <div className='loading-container'>
            <LoadingSpinner />
          </div>
        )}
      </div>
    </InfiniteScroll>
  );
}

export default Table;
