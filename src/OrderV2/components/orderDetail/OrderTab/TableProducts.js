import InfiniteScroll from 'react-infinite-scroll-component';
import { useTable, useRowSelect } from 'react-table';
import { Checkbox, replaceUrlParam } from '../../utils';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../../../../components/common';

function TableProducts(props) {
  const {
    columns,
    data,
    setSelectedRows,
    setParams,
    setFilterLoading,
    params,
    setPage,
    update,
    scrollLoading,
    filterLoading,
    selectedRows
  } = props;

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
    const originalProducts = selectedFlatRows.map(item => item.original);

    setSelectedRows(originalProducts);
  }, [selectedRowIds]);

  const quantityOnChange = (value, id) => {
    const selectedProducts = selectedRows.map(item => {
      return item._id === id
        ? {
            ...item,
            quantity: Number(value),
            total: Math.floor(value * item.stock)
          }
        : { ...item };
    });

    setSelectedRows(selectedProducts);
  };

  const handleOnChange = (value, column) => {
    const { parameter } = column;

    const newUrlParam = replaceUrlParam(params, parameter, value);

    setPage(1);
    setQuery(newUrlParam);
  };

  const renderHeaderInputs = column => {
    if (
      column.id === 'selection' ||
      column.id === 'delete' ||
      !column.isFilter
    ) {
      return null;
    }

    return (
      <input
        className='table-header-input'
        onChange={e => handleOnChange(e.target.value, column)}
      />
    );
  };

  return (
    <InfiniteScroll
      dataLength={rows.length}
      next={update}
      hasMore={true}
      scrollableTarget='productDiv'
    >
      <div id='productDiv'>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                    className='text-center font-bold'
                    id={column.parameter}
                  >
                    <div>
                      {column.render('Header')}
                      {renderHeaderInputs(column)}
                    </div>
                  </th>
                ))}
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
                      if (cell.column.parameter === 'quantity') {
                        const checkedProduct = selectedFlatRows.find(
                          item => item.original._id === row.original._id
                        );

                        return (
                          <td
                            {...cell.getCellProps()}
                            id={cell.column.parameter}
                          >
                            <input
                              className='table-header-input'
                              onChange={e =>
                                quantityOnChange(
                                  e.target.value,
                                  checkedProduct.original._id
                                )
                              }
                              disabled={checkedProduct ? false : true}
                            />
                          </td>
                        );
                      }

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
                        <td {...cell.getCellProps()} id={cell.column.parameter}>
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

        {scrollLoading && data && data.length > 0 && (
          <div className='loading-container'>
            <LoadingSpinner />
          </div>
        )}
      </div>
    </InfiniteScroll>
  );
}

export default TableProducts;
