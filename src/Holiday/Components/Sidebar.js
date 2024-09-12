import React, { useState, useEffect, Fragment } from 'react';
import myHeaders from '../../components/MyHeader/myHeader';
const areEqual = (prevProps, nextProps) => true;
const Sidebar = React.memo(({ data, orderdata }) => {
  const [dataOne, setDataOne] = useState([]);

  useEffect(() => {
    setDataOne(orderdata);
  }, [orderdata]);
  // const [orderData, setOrderData] = useState([]);
  // const [ids, setIDS] = useState("");
  // const [small, setSmall] = useState([]);
  // // const [ids, setIds] = useState(props.data.order_ids);
  // // console.log("ids", ids);

  // useEffect(() => {
  //   setIDS(props.data.order_ids);
  // }, [props.data]);
  // useEffect(() => {
  //   let aa = ids.split(",");
  //   let data = [];
  //   console.log("aa", aa);

  //   aa.map((item) => {
  //     console.log("item", item);
  //     var requestOptions = {
  //       method: "GET",
  //       headers: myHeaders,
  //       redirect: "follow",
  //     };
  //     fetch(
  //       `${process.env.REACT_APP_API_URL2}/api/coupon/orderdata?order_id=${Number(item)}`,
  //       requestOptions
  //     )
  //       .then((r) => r.json())
  //       .then((response) => {
  //         console.log("response ", response);
  //         data.push(response);
  //       })
  //       .catch((error) => {
  //         console.log("error", error);
  //       });
  //   });
  //   console.log("data", data);
  //   setSmall(data);
  // }, [ids]);
  // console.log("data outside", small);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%'
      }}
    >
      <div
        style={{
          background: '#F6F7F8',
          padding: '10px 10px 0px 10px',
          borderRadius: '6px',
          marginBottom: '16px'
        }}
      >
        <p>
          <span
            style={{
              fontSize: '14px',
              color: '#263238',
              fontWeight: '700'
            }}
          >
            Дэлгүүрийн нэр :
          </span>{' '}
          {data.tradeshop_name}
        </p>
        <p>
          <span
            style={{
              fontSize: '14px',
              color: '#263238',
              fontWeight: '700'
            }}
          >
            Утасны дугаар :
          </span>{' '}
          {data.user_number}
        </p>
      </div>
      <div
        style={{
          width: '100%',
          height: '80vh',
          display: 'block',
          overflowY: 'auto',
          marginLeft: '10px'
        }}
      >
        <ul style={{ listStyle: 'none' }}>
          {dataOne.map((item, index) => {
            return (
              <li
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  borderBottom: '0.8px dashed #CFD8DC'
                }}
              >
                <p
                  style={{
                    fontSize: '14px'
                  }}
                >
                  <span
                    style={{
                      fontSize: '14px',
                      color: '#263238',
                      fontWeight: '700'
                    }}
                  >
                    Захиалгын дугаар :
                  </span>{' '}
                  <span
                    style={{
                      fontSize: '14px',

                      color: '#90A4AE'
                    }}
                  >
                    {' '}
                    &nbsp;{item.order}
                  </span>
                </p>
                <p>
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#263238'
                    }}
                  >
                    Захиалгын нийт дүн :
                  </span>
                  <span
                    style={{
                      fontSize: '14px',
                      color: '#90A4AE'
                    }}
                  >
                    &nbsp;{item.total.toLocaleString()}₮
                  </span>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}, areEqual);

export default Sidebar;
