import React from "react";
import css from "./notifbuttons.module.css";
import Button from "./Button";
import myHeaders from "../../../components/MyHeader/myHeader";
const NotifButtons = (props) => {
  console.log("notif order", props);
  const sendHandler = () => {
    if (props.order.status === 3) {
      alert(
        "Энэ захиалга хүргэгдсэн төлөвтэй байна. Та notification илгээх боломжгүй. "
      );
      return;
    }
    if (props.order.status === 5) {
      alert(
        "Энэ захиалга цуцлагдсан төлөвтэй байна. Та notification илгээх боломжгүй. "
      );
      return;
    }
    var raw = JSON.stringify({
      icon: "https://ebazaar.mn/logo/logon.png",
      title: "Захиалга №" + props.order.order_id,
      body: props.pushNotif,
      status_id: 1,
    });
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log("push notif ", requestOptions);
    fetch(
      "https://api2.ebazaar.mn/api/notification/pushsingle?UserID=" +
        props.order.user_id
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("push notif result", result);
        if (result.code !== 400) {
          let raw = {
            section_name: "PushNotif илгээх",
            entry_id: props.order.order_id,
            user_name: props.userData.email,
            action: props.pushNotif,
          };
          let requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          console.log("backoffice log", requestOptions);

          fetch(
            `https://api2.ebazaar.mn/api/create/backofficelog`,
            requestOptions
          );

          alert("Амжилттай илгээлээ.");
        } else {
          alert("Алдаа гарлаа.");
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div className={css.container}>
      <Button
        name="Илгээх"
        className={css.approvebtn}
        clickHandler={sendHandler}
      />
    </div>
  );
};

export default NotifButtons;
