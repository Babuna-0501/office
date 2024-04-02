import css from "./orderReceipts.module.css";
import logo from "../../assets/orders/logo.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import myHeaders from "../../components/MyHeader/myHeader";
import * as htmlToImage from "html-to-image";
import { Button, LoadingSpinner } from "../../components/common";
import placeHolder from "../../assets/orders/placeholder.jpg";
import ErrorPopup from "../../Achiltiinzahialga/components/common/ErrorPopup";

export const OrderReceipts = ({ orders, closeHandler }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [order, setOrder] = useState(orders[currentIndex]);
  const [supplier, setSupplier] = useState({});

  const [totalPrice, setTotalPrice] = useState(0);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [showBtn, setShowBtn] = useState(true);

  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [loading, setLoading] = useState(true);

  const netgelRef = useRef(null);

  useEffect(() => {
    const getSuppliers = async () => {
      try {
        setLoading(true);

        const url = `https://api2.ebazaar.mn/api/backoffice/suppliers?id=14005`;
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
        };

        const res = await fetch(url, requestOptions);
        const resData = await res.json();

        setSupplier(resData.data[0]);
      } catch (error) {
        setErrorMsg(error.message);
        setShowErrorMsg(true);
      } finally {
        setLoading(false);
      }
    };

    getSuppliers();
  }, []);

  useEffect(() => {
    if (currentIndex === orders.length) {
      closeHandler();
    } else {
      setOrder(orders[currentIndex]);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (order && !loading) {
      let total = 0;

      for (const product of order.line) {
        total += product.quantity * product.price;
      }

      setWidth(netgelRef.current.clientWidth);
      setHeight(netgelRef.current.clientHeight);

      setTotalPrice(total);
    }
  }, [order, loading]);

  const downloadHandler = useCallback(() => {
    if (netgelRef.current === null) return;
    setShowBtn(false);

    htmlToImage
      .toPng(netgelRef.current, {
        cacheBust: true,
        canvasWidth: width * 3,
        canvasHeight: height * 3,
        imagePlaceholder: placeHolder,
      })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `Зарлагын-баримт-${order.order_id}.png`;
        link.href = dataUrl;
        link.click();
        setCurrentIndex((prev) => prev + 1);
        setShowBtn(true);
      })
      .catch((err) => console.log(err));
  }, [netgelRef, height, width, order]);

  return (
    <>
      {!loading && order && (
        <>
          <div className={css.container} ref={netgelRef}>
            <div className={css.header}>
              <div className={css.logoWrapper}>
                <img src={logo} alt="Ebazaar" />
              </div>
              <div className={css.headerDetails}>
                <h1>{supplier.name}</h1>
                <p>
                  {supplier.address} <br /> <strong>Утас:</strong> {supplier.phone} / <strong>И-мэйл:</strong> {supplier.email}
                </p>
              </div>
            </div>

            <div className={css.separator} />

            <div className={css.titleWrapper}>
              <h1 className={css.title}>Захиалга</h1>
              {showBtn && (
                <Button onClick={downloadHandler} variant="primary" size="medium">
                  Зарлагын баримт хэвлэх
                </Button>
              )}
            </div>

            <div className={css.tradeshopDetails}>
              <h2 className={css.tradeshopName}>Захиалагч: {order.tradeshop_name}</h2>
              <p>
                <strong>Хүргэлтйн хаяг:</strong> {order.address}
              </p>
              <div className={css.tradeshopContact}>
                <p>
                  <strong>Регистер:</strong> {order.register}
                </p>
                <p>
                  <strong>Утас:</strong> {order.phone}
                </p>
              </div>
            </div>

            <div className={css.orderDetails}>
              <span>
                Захиалгын дугаар: <strong>{order.order_id}</strong>
              </span>

              <span>
                Хүргэлтийн өдөр: <strong>{order.delivery_date.split("T")[0]}</strong>
              </span>

              <span>
                Нийт дүн: <strong>{totalPrice.toLocaleString()}₮</strong>
              </span>
            </div>

            <div className={css.products}>
              <div className={css.productsHeader}>
                <div className={css.singleHeaderItem} style={{ width: 36 }}>
                  Зураг
                </div>
                <div className={css.singleHeaderItem} style={{ width: 300 }}>
                  Бүтээгдэхүүний нэр
                </div>
                <div className={css.singleHeaderItem} style={{ width: 140 }}>
                  Баркод
                </div>
                <div className={css.singleHeaderItem} style={{ width: 100 }}>
                  Үнэ
                </div>
                <div className={css.singleHeaderItem} style={{ width: 60 }}>
                  Ширхэг
                </div>
                <div className={css.singleHeaderItem} style={{ width: 100 }}>
                  Нийт үнэ
                </div>
              </div>

              {order.line.map((product) => {
                return (
                  <div key={`order-${order.order_id}-product-${product.product_id}`} className={css.singleProduct}>
                    <div className={css.productImg}>
                      <div className={css.imgWrapper}>
                        <img src={product.product_image} alt={product.product_name} />
                      </div>
                    </div>

                    <div className={css.singleProductItem} style={{ width: 300 }}>
                      {product.product_name}
                    </div>
                    <div className={css.singleProductItem} style={{ width: 140 }}>
                      {product.product_bar_code}
                    </div>
                    <div className={css.singleProductItem} style={{ width: 100 }}>
                      {product.price.toLocaleString()}₮
                    </div>
                    <div className={css.singleProductItem} style={{ width: 60 }}>
                      {product.quantity.toLocaleString()}
                    </div>
                    <div className={css.singleProductItem} style={{ width: 100 }}>
                      {(product.price * product.quantity).toLocaleString()}₮
                    </div>
                  </div>
                );
              })}
            </div>

            <p className={css.totalPrice}>
              Нийт дүн: <strong>{totalPrice.toLocaleString()}₮</strong>
            </p>
          </div>
        </>
      )}
      {loading && (
        <div className={css.spinner}>
          <LoadingSpinner />
        </div>
      )}
      {showErrorMsg && <ErrorPopup closeHandler={() => setShowErrorMsg(false)} message={errorMsg} />}
    </>
  );
};
