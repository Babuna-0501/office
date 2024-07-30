import React, { useEffect, useState } from 'react';
import css from './notiftab.module.css';
import myHeaders from '../../../components/MyHeader/myHeader';

const NotifTab = props => {
  const [message, setMessage] = useState(
    `Таны ${props.order.supplier_name}-д хийсэн захиалга баталгаажиж ХХ-ХХ өдөр хүргэгдэхээр боллоо. eBazaar.mn - 77071907`
  );

  const [notifLog, setNotifLog] = useState([]);
  // const [bodyData, setBodyData] = useState([]);

  console.log('USER_ID IN NOTIFTAB', props.order.user_id); //user_id
  console.log('ORDER_ID IN NOTIFTAB', props.order.order_id); //order_id

  const ChangeHandler = e => {
    setMessage(e.target.value);
    props.setPushNotifMessage(message);
  };

  useEffect(() => {
    const getNotifLog = () => {
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch(
        `${process.env.REACT_APP_API_URL2}/api/notification/get?userId=${props.order.user_id}&orderId=${props.order.order_id}`,
        requestOptions
      )
        .then(r => r.json())
        .then(res => {
          console.log('GETTO: ', res.data);
          setNotifLog(res.data);
          // if (res.data.length > 0) {
          // 	props.setHasNotif(true);
          // }
          // console.log("RES.DATA", res.data.length);
        })
        .catch(err => console.log('ERROR: ', err));
    };
    getNotifLog();
  }, []);

  // const filter = notifLog.filter(
  // 	item =>
  // 		item.Body ===
  // 		`Таны ${props.order.supplier_name} нийлүүлэгчээс захиалсан ${props.order.user_id} дугаартай захиалга баталгаажлаа. Оператортай холбогдож дэлгэрэнгүй мэдээлэл авахыг хүсвэл 7707-1907 дугаарт холбогдоно уу. Танд барлалаа.`
  // );
  // console.log("FILTER", filter);

  return (
    <div className={css.container}>
      {/* <div className={css.closecontainer}>
        <span className="close">Close</span>
      </div> */}
      <div className={css.headercontainer}>
        <h1>Push notification</h1>
      </div>
      <div className={css.bodycontainer}>
        <textarea value={message} onChange={ChangeHandler}></textarea>
      </div>
      <div className={css.headercontainer}>
        <h1>Notification log</h1>
      </div>
      <div className={css.logContainer}>
        {notifLog.length !== 0 ? (
          notifLog?.map((e, idx) => (
            <section className={css.logContent} key={idx}>
              <div className={css.logContentHeader}>
                <p>
                  {e.CreatedDate.substr(0, 10) +
                    '  ' +
                    e.CreatedDate.substr(11, 5)}
                </p>
                <p>{e.backOfficeUser}</p>
              </div>
              <div className={css.logContentBody}>{e.Body}</div>
              {/* {e.CreatedDate
								? e.CreatedDate.substr(0, 10) +
								  "-" +
								  e.CreatedDate.substr(11, 5) +
								  "  " +
								  e.Body +
								  (e.backOfficeUser ? " " + e.backOfficeUser : "-----")
								: e.Body} */}
            </section>
          ))
        ) : (
          <section>
            Энэ захиалгатай холбоотой <b>notification</b> байхгүй байна.
          </section>
        )}
      </div>
    </div>
  );
};

export default NotifTab;
