import myHeaders from "../components/MyHeader/myHeader";
function PushNotfication(props) {
  // console.log(props);
  let order = props.data;
  const template = `Таны ${order.supplier_name}-д хийсэн захиалга баталгаажиж ХХ-ХХ өдөр хүргэгдэхээр боллоо. eBazaar.mn - 77071907`;
  const send = () => {
    const foobar = document.getElementById("template");
    if (foobar.value !== template) {
      // console.log(foobar.value);
      let d = new Date();

      var raw = JSON.stringify({
        icon: "https://ebazaar.mn/logo/logon.png",
        title: "Захиалга №" + order.order_id,
        body: foobar.value,
        status_id: 1,
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(
        "https://api2.ebazaar.mn/api/notification/pushsingle?UserID=" +
          order.user_id,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.code !== 400) {
            alert("Амжилттай илгээлээ.");
          } else {
            alert("Алдаа гарлаа.");
          }
        })
        .catch((error) => console.log("error", error));
    } else {
      foobar.style.borderColor = "red";
    }
  };
  return (
    <div id="bg" style={{ zIndex: "150" }}>
      <div id="foo">
        <span className="close" onClick={() => props.setPush(false)}>
          Close
        </span>
        <h1>Push notification</h1>
        <textarea defaultValue={template} id="template"></textarea>
        <button onClick={() => send()}>Илгээх</button>
      </div>
    </div>
  );
}

export default PushNotfication;
