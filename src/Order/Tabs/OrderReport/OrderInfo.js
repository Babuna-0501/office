import React from 'react';
import css from './orderinfo.module.css';

const OrderInfo = props => {
  const dataheader = [
    {
      id: 0,
      name: '№',
      width: '50px'
    },
    {
      id: 1,
      name: 'Баркод:',
      width: '300px'
    },
    {
      id: 2,
      name: 'Бүтээгдэхүүний нэр:',
      width: '750px'
    },
    {
      id: 3,
      name: 'Хэмжих:',
      width: '100px'
    },
    {
      id: 4,
      name: 'Үнэ:',
      width: '150px'
    },
    {
      id: 5,
      name: 'Нийт үнэ:',
      width: '150px'
    }
  ];

  return (
    <div className={css.container}>
      <div className={css.header}>
        {dataheader.map((item, i) => {
          return (
            <div
              style={{
                width: item.width,
                color: '#1A1A1A',
                fontWeight: '700',
                fontSize: props.pFont
              }}
            >
              {item.name}
            </div>
          );
        })}
      </div>
      <div className={css.body}>
        {props.data.line.map((item, index) => {
          let totalPrice = item.quantity * item.price;
          let too = 'ш';
          let names = ['грам', 'гр', 'кг'];

          names.map(x => {
            if (item.product_name.toString().includes(x)) {
              too = x;
            }
          });
          return (
            <div className={css.bodywrapper} key={index}>
              {/* <div
                style={{
                  width: dataheader[0].width,
                  height: dataheader[0].width,
                  display: props.display,
                  marginLeft: "10px",
                  backgroundColor: "green",
                }}
              >
                <img
                  src={
                    item.product_image === "" || undefined
                      ? `${process.env.REACT_APP_MEDIA_URL}/product/27d2e8954f9d8cbf9d23f500ae466f1e24e823c7171f95a87da2f28ffd0e.jpg`
                      : item.product_image
                  }
                  alt="product"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div> */}
              <div
                style={{
                  width: dataheader[0].width,
                  fontSize: props.pFont
                  // marginLeft: "5px",
                }}
              >
                {index + 1}
              </div>
              <div
                style={{
                  width: dataheader[1].width,
                  fontSize: props.pFont,
                  marginLeft: '5px'
                }}
              >
                {item.product_bar_code}
              </div>
              <div
                style={{
                  width: dataheader[2].width,
                  fontSize: props.pFont,
                  marginLeft: '10px'
                }}
              >
                {item.product_name}
              </div>
              <div
                style={{
                  width: dataheader[3].width,
                  fontSize: props.pFont,
                  marginLeft: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {item.quantity}
              </div>
              <div
                style={{
                  width: dataheader[4].width,
                  fontSize: props.pFont
                }}
              >
                {item.price.toLocaleString() + '₮'}
              </div>
              <div
                style={{
                  width: dataheader[5].width,
                  fontSize: props.pFont,
                  marginLeft: '10px'
                }}
              >
                {totalPrice.toLocaleString() + '₮'}
              </div>
            </div>
          );
        })}
      </div>
      <div className={css.totalPrice}>
        <div className={css.totalText} style={{ fontSize: props.pFont }}>
          Нийт дүн
        </div>
        <div className={css.totalAmount} style={{ fontSize: props.pFont }}>
          {props.data.grand_total.toLocaleString() + '₮'}
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
