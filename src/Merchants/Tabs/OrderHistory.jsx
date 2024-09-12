import React, { useState } from 'react';
import css from './orderhistory.module.css';
import ExcelJS from 'exceljs';
import HistoryHeader from './components/HistoryHeader';
import HistoryList from './components/HistoryList';
import myHeaders from '../../components/MyHeader/myHeader';
import { useEffect } from 'react';
import OrderDownload from './components/OrderDownload';

const OrderHistory = props => {
  const { order, setOrder, isOrderDetail, setIsOrderDetail } = props;

  const [orders, setOrders] = useState();
  const [download, setDownload] = useState(false);
  const [orderStats, setOrderStats] = useState({
    waitingOrder: 0,
    confirmedOrder: 0,
    deliveredOrder: 0,
    canceledOrder: 0,
    priceAmount: 0
  });

  useEffect(() => {
    if (orders) {
      const updatedStats = {
        waitingOrder: 0,
        confirmedOrder: 0,
        deliveredOrder: 0,
        canceledOrder: 0,
        priceAmount: 0
      };

      orders.forEach(order => {
        order.line.forEach(line => {
          updatedStats.priceAmount += line.amount;
        });

        switch (order.status) {
          case 1:
            order.line.forEach(line => {
              updatedStats.waitingOrder += line.amount;
            });
            break;
          case 2:
            order.line.forEach(line => {
              updatedStats.confirmedOrder += line.amount;
            });
            break;
          case 3:
            order.line.forEach(line => {
              updatedStats.deliveredOrder += line.amount;
            });
            break;
          case 4:
          case 5:
            order.line.forEach(line => {
              updatedStats.canceledOrder += line.amount;
            });
            break;
          default:
            break;
        }
      });

      setOrderStats(updatedStats);
    }
  }, [orders]);

  const getData = () => {
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const url = `${process.env.REACT_APP_API_URL2}/api/orders?tradeshop_id=${props.data?.[0]?.[0].TradeshopID}`;

    fetch(url, requestOptions)
      .then(r => r.json())
      .then(res => {
        console.log('DATA: ', res.data);
        setOrders(res.data);
      });
  };

  const createExcelTemplate = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Захиалгын түүх');

    worksheet.columns = [
      {
        header: 'Захиалгын дугаар',
        key: 'orderNum'
      },
      {
        header: 'Бүтээгдэхүүний дугаар',
        key: 'productId'
      },
      {
        header: 'Бүтээгдэхүүний нэр',
        key: 'productName'
      },
      {
        header: 'Дүн',
        key: 'amount'
      },
      {
        header: 'Хүргүүлэх өдөр',
        key: 'deliveryDate'
      },
      {
        header: 'Захиалсан',
        key: 'orderDate'
      },
      {
        header: 'Утас',
        key: 'customerPhone'
      },
      {
        header: 'Захиалсан',
        key: 'customerName'
      }
    ];

    for (const order of orders) {
      for (const product of order.line) {
        worksheet.addRow({
          orderNum: order.order_id,
          productId: product.product_id,
          productName: product.product_name,
          deliveryDate: order.delivery_date.slice(0, 10),
          amount: product.price_amount,
          orderDate: order.cart_date.slice(0, 10),
          customerPhone: order.phone,
          customerName: order.business_name
        });
      }
    }
    worksheet.addRow({
      orderNum: '',
      productId: '',
      productName: '',
      deliveryDate: '',
      amount: `${Number(orderStats.priceAmount)}`,
      orderDate: '',
      customerPhone: '',
      customerName: ''
    });
    workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const date = new Date();
      const formattedDate = date.toISOString().slice(0, 10); // Format the date as yyyy-mm-dd
      a.download = `захиалгийн түүх ${formattedDate}`;

      a.click();
      window.URL.revokeObjectURL(url);
    });
  };

  useEffect(() => {
    if (download) {
      createExcelTemplate();
    }
  }, [download]);

  useEffect(() => {
    getData();
  }, [props.data[0][0].TradeshopID]);

  const handleDownload = () => {
    setDownload(true);
  };

  return (
    <div className={css.container}>
      <div>
        <HistoryHeader />
        <div className={css.listContainer}>
          {orders?.map((item, idx) => {
            return (
              <HistoryList
                order={item}
                setIsOrderDetail={setIsOrderDetail}
                setOrder={setOrder}
                key={idx}
              />
            );
          })}
        </div>
      </div>
      <div className={css.orderDetails}>
        <div className={css.orderOneDetail}>
          <div className={css.left}>
            <div className={css.countWrapper} style={{ color: '#4d4d4d' }}>
              {/* {waitingOrder.count}ш */}
            </div>
          </div>
          <div className={css.right}>
            <span>Хүлээгдэж буй:</span>
            <span>
              {orderStats.waitingOrder.toLocaleString().replace(/,/g, ',')}₮
            </span>
          </div>
        </div>
        <div className={css.orderOneDetail}>
          <div className={css.left}>
            <div
              className={css.countWrapper}
              style={{ backgroundColor: '#00ADD0' }}
            >
              {/* 1ш */}
            </div>
          </div>
          <div className={css.right}>
            <span>Баталгаажсан:</span>
            <span>
              {orderStats.confirmedOrder.toLocaleString().replace(/,/g, ',')}₮
            </span>
          </div>
        </div>
        <div className={css.orderOneDetail}>
          <div className={css.left}>
            <div
              className={css.countWrapper}
              style={{ backgroundColor: '#76cc33' }}
            >
              {/* 1ш */}
            </div>
          </div>
          <div className={css.right}>
            <span>Хүргэгдсэн:</span>
            <span>
              {orderStats.deliveredOrder.toLocaleString().replace(/,/g, ',')}₮
            </span>
          </div>
        </div>
        <div className={css.orderOneDetail}>
          <div className={css.left}>
            <div
              className={css.countWrapper}
              style={{ backgroundColor: '#eb5e43' }}
            >
              {/* ш */}
            </div>
          </div>
          <div className={css.right}>
            <span>Цуцлагдсан:</span>
            <span>
              {orderStats.canceledOrder.toLocaleString().replace(/,/g, ',')}₮
            </span>
          </div>
        </div>
        <div className={css.orderOneDetail}>
          <div className={css.left}>
            <div
              className={css.countWrapper}
              style={{ backgroundColor: '#dfedda', color: '#4d4d4d' }}
            >
              {/* ш */}
            </div>
          </div>
          <div className={css.right}>
            <span>Нийт:</span>
            <span>
              {orderStats.priceAmount.toLocaleString().replace(/,/g, ',')}₮
            </span>
          </div>
        </div>
      </div>

      <OrderDownload handleDownload={handleDownload} />
    </div>
  );
};

export default OrderHistory;
