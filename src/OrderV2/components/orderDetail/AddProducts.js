import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Checkbox } from '../utils';
import { useTable, useRowSelect } from 'react-table';

function AddProducts({
  onClose,
  data,
  columns,
  update,
  setSelectedRows,
  addFunction
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
        ...columns
      ]);
    }
  );

  useEffect(() => {
    setSelectedRows(selectedFlatRows);
  }, [selectedRowIds]);

  return (
    <div className='addProduct-table-container'>
      <InfiniteScroll
        dataLength={rows.length}
        hasMore={true}
        next={update}
        scrollableTarget='scrollableDiv'
      >
        <div id='scrollableDiv'>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps()}
                      className='text-center font-bold'
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      if (cell.column.parameter === 'image') {
                        return (
                          <td
                            {...cell.getCellProps()}
                            id={cell.column.parameter}
                          >
                            <img
                              src={cell.value[0]}
                              alt={cell.column.parameter}
                            />
                          </td>
                        );
                      }

                      return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </InfiniteScroll>

      <div className='bottom-buttons'>
        <button className='order_detail_button' onClick={onClose}>
          Болих
        </button>
        <button className='order_detail_button' onClick={addFunction}>
          Нэмэх
        </button>
      </div>
    </div>
  );
}

export default AddProducts;
