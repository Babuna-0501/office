// CSS
import { useRef } from 'react';
import css from './combinedProducts.module.css';
import { Button } from './common';
import { useState } from 'react';
import { useEffect } from 'react';
import myHeaders from '../../components/MyHeader/myHeader';
import LoadingSpinner from '../../components/Spinner/Spinner';
import * as htmlToImage from 'html-to-image';
import { useCallback } from 'react';
import writeXlsxFile from 'write-excel-file';

const initSchema = [
  {
    column: '№',
    type: Number,
    value: p => p.number,
    width: 10,
    align: 'center',
    alignVertical: 'center'
  },
  {
    column: 'Бүтээгдэхүүн',
    type: String,
    value: p => p.name,
    width: 20,
    align: 'center',
    alignVertical: 'center'
  },
  {
    column: 'SKU',
    type: String,
    value: p => p.sku,
    width: 10,
    align: 'center',
    alignVertical: 'center'
  },
  {
    column: 'Barcode',
    type: String,
    value: p => p.barcode,
    width: 20,
    align: 'center',
    alignVertical: 'center'
  },
  {
    column: 'Нэгж үнэ',
    type: Number,
    value: p => p.price,
    width: 10,
    align: 'right',
    alignVertical: 'center'
  },
  {
    column: 'Тоо ширхэг',
    type: Number,
    value: p => p.quantity,
    width: 10,
    align: 'right',
    alignVertical: 'center'
  },
  {
    column: 'Нийт үнэ',
    type: Number,
    value: p => p.totalPrice,
    width: 10,
    align: 'right',
    alignVertical: 'center'
  }
];

export const CombinedProducts = props => {
  const { startDate, endDate, closeHandler, userData } = props;

  console.log('PROPS OF COMBINED PRODUCTS: ', props);

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);

  const receiptRef = useRef(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [schema, setSchema] = useState(initSchema);
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const getShipments = async () => {
      try {
        setLoading(true);

        const companyId =
          Number(userData.company_id.replaceAll('|', '')) === 1
            ? 1
            : Number(userData.company_id.replaceAll('|', ''));

        const url = `${process.env.REACT_APP_API_URL2}/api/shipment?supplierId=${companyId}&startDate=${startDate}&endDate=${endDate}&page=0`;
        // if (props.filterUrl) {
        // 	let url = props.filterUrl;
        // } else {
        // 	let url = `${process.env.REACT_APP_API_URL2}/api/shipment?supplierId=${companyId}&startDate=${startDate}&endDate=${endDate}&page=0`;
        // }
        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const res = await fetch(
          props.filterUrl ? props.filterUrl : url,
          requestOptions
        );
        const resData = await res.json();

        let productsIds = [];

        for (const shipment of resData.data) {
          for (const product of shipment.products) {
            productsIds.push(product.productId);
          }
        }

        productsIds = [...new Set(productsIds)];

        const productUrl = `${
          process.env.REACT_API_URL2
        }/products/get1?ids=[${productsIds.join(',')}]`;

        const productRes = await fetch(productUrl, requestOptions);
        const productData = await productRes.json();

        const productCopy = productData.data.map(prod => ({
          ...prod,
          count: 0
        }));

        for (const prod of productCopy) {
          for (const shipment of resData.data) {
            const shipProd = shipment.products.find(
              prodct => prodct.productId === prod._id
            );

            if (shipProd) {
              prod.count += shipProd.count;
            }
          }
        }

        for (const shipment of resData.data) {
          if (shipment.orders) {
            setOrders(prev => [...prev, ...shipment.orders.split(',')]);
          }
        }

        const reportDataCopy = [];
        const schemaCopy = [...schema];

        for (let i = 0; i < productCopy.length; i++) {
          const data = {
            number: i + 1,
            name: productCopy[i].name,
            sku: productCopy[i].sku,
            barcode: productCopy[i].bar_code,
            price:
              productCopy[i].locations?.[`62f4aabe45a4e22552a3969f`]?.price
                ?.channel?.[1],
            quantity: productCopy[i].count,
            totalPrice:
              productCopy[i].locations?.[`62f4aabe45a4e22552a3969f`]?.price
                ?.channel?.[1] * productCopy[i].count
          };

          if (data.name.length + 5 > schemaCopy[1].width) {
            schemaCopy[1].width = data.name.length + 5;
          }
          if (data.sku.length + 5 > schemaCopy[2].width) {
            schemaCopy[2].width = data.sku.length + 5;
          }
          if (data.barcode.length + 5 > schemaCopy[3].width) {
            schemaCopy[3].width = data.barcode.length + 5;
          }
          if ((data.price + '').length + 5 > schemaCopy[4].width) {
            schemaCopy[4].width = (data.price + '').length + 5;
          }
          if ((data.quantity + '').length + 5 > schemaCopy[5].width) {
            schemaCopy[5].width = (data.quantity + '').length + 5;
          }
          if ((data.totalPrice + '').length + 5 > schemaCopy[6].width) {
            schemaCopy[6].width = (data.totalPrice + '').length + 5;
          }

          reportDataCopy.push({ ...data });
        }

        setReportData(reportDataCopy);
        setSchema(schemaCopy);
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', productCopy);
        setProducts(productCopy);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getShipments();
  }, [startDate, endDate, userData.company_id]);

  useEffect(() => {
    if (!loading) {
      setWidth(receiptRef.current.clientWidth);
      setHeight(receiptRef.current.clientHeight);
    }
  }, [loading]);

  const downloadHandler = useCallback(() => {
    if (receiptRef.current === null) return;

    htmlToImage
      .toPng(receiptRef.current, {
        cacheBust: true,
        canvasWidth: width * 3,
        canvasHeight: height * 3
      })
      .then(dataUrl => {
        const link = document.createElement('a');
        link.download = `нэгтгэл-${startDate}-${endDate}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch(err => console.log(err));
  }, [receiptRef, height, width, startDate, endDate]);

  const downloadReport = () => {
    writeXlsxFile(reportData, {
      sheet: `Ачилтын захиалга нэгтгэл ${startDate} ${endDate}`,
      schema,
      fileName: `Ачилтын-захиалга-нэгтгэл-/${startDate}/-/${endDate}/.xlsx`,
      headerStyle: {
        backgroundColor: '#d3d3d3',
        align: 'center',
        alignVertical: 'center',
        borderColor: '#000000'
      },
      fontFamily: 'Calibri',
      fontSize: 11,
      alignVertical: 'center',
      align: 'center',
      dateFormat: 'mm/dd/yyyy',
      stickyRowsCount: 1
    });
  };

  return (
    <div
      onClick={closeHandler}
      className={css.printRecieptContainer}
      style={{
        justifyContent: products.length >= 17 ? 'flex-start' : 'center'
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        ref={receiptRef}
        className={css.receiptContainer}
      >
        <div className={css.receiptWrapper}>
          <span className={css.title}>Ачилтын захиалгын нэгтгэл</span>

          {!loading && (
            <>
              <div className={css.shipmentDetails}>
                <span>Эхлэх огноо: {startDate}</span>
                <span>Дуусах огноо:{endDate}</span>
              </div>

              <table className={css.productTables}>
                <thead>
                  <tr>
                    <th style={{ width: '1%' }}>№</th>
                    <th>Бүтээгдэхүүн</th>
                    <th>SKU</th>
                    <th>Barcode</th>
                    <th>Нэгж үнэ</th>
                    <th>Тоо ширхэг</th>
                    <th>Нийт үнэ</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => {
                    return (
                      <tr key={`receipt-${product._id}`}>
                        <td>{index + 1}</td>
                        <td>{product.name}</td>
                        <td>{product.sku}</td>
                        <td>{product.bar_code}</td>
                        <td>
                          {product.locations?.[
                            `62f4aabe45a4e22552a3969f`
                          ]?.price?.channel?.[1].toLocaleString()}
                          ₮
                        </td>
                        <td>{product.count}</td>
                        <td>
                          {(
                            product.locations?.[`62f4aabe45a4e22552a3969f`]
                              ?.price?.channel?.[1] * product.count
                          ).toLocaleString()}
                          ₮
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className={css.productFooterWrapper}>
                <div className={css.productsDetail}>
                  <span>Нийт захиалгын тоо: {[...new Set(orders)].length}</span>

                  <span>Нийт барааны төрөл: {products.length}</span>
                  <span>
                    Нийт бүтээгдэхүүн:{' '}
                    {products
                      .reduce((acc, cur) => acc + cur.count, 0)
                      .toLocaleString()}
                    ш
                  </span>
                  <div>
                    Нийт үнийн дүн:{' '}
                    {products
                      .reduce(
                        (acc, cur) =>
                          acc +
                          cur.count *
                            cur.locations?.[`62f4aabe45a4e22552a3969f`]?.price
                              ?.channel?.[1],
                        0
                      )
                      .toLocaleString()}
                    ₮
                  </div>
                </div>

                <div className={css.infoFooter}>
                  <div className={css.rightSide}>
                    <span>
                      Ачилтын нэгтгэл үүсгэсэн:&nbsp; ________________________
                    </span>
                    <span>
                      Ачилтын хүлээн авсан: &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                      ________________________
                    </span>
                    <span>
                      Ачилтыг хянасан: &nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
                      &nbsp;&nbsp; ________________________
                    </span>
                  </div>

                  <div className={css.leftSide}>Тэмдэг</div>
                </div>
              </div>
            </>
          )}

          {loading && (
            <div className={css.loadingSpinner}>
              <LoadingSpinner />
            </div>
          )}
        </div>
      </div>

      <div className={css.printBtn}>
        <Button onClick={closeHandler} variant='secondary' size='medium'>
          Болих
        </Button>

        <Button
          disabled={loading}
          onClick={e => {
            e.stopPropagation();
            downloadHandler();
          }}
          variant='primary'
          size='medium'
        >
          Татах
        </Button>

        <Button
          onClick={e => {
            e.stopPropagation();
            downloadReport();
          }}
          disabled={loading}
          variant='primary'
          size='medium'
        >
          Excel татах
        </Button>
      </div>
    </div>
  );
};
