import {
  Button,
  Dropdown,
  Input,
  Modal
} from '../../Achiltiinzahialga/components/common';
import LoadingSpinner from '../../components/Spinner/Spinner';
import css from './shipmentCreate.module.css';
import closeIcon from '../../assets/shipment/closeIcon.svg';
import { useState } from 'react';
import notFound from '../../assets/shipment/package.svg';
import { useEffect } from 'react';
import myHeaders from '../../components/MyHeader/myHeader';
import okIcon from '../../assets/shipment/ok.svg';
import ErrorPopup from '../../Achiltiinzahialga/components/common/ErrorPopup';

const ShipmentCreate = props => {
  const { orders, closeHandler, users, userData, setChangedTugeegch } = props;

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [shipmentInvenLoading, setShipmentInvenLoading] = useState(false);

  const [checkedTugeegchs, setCheckedTugeegchs] = useState(false);
  const [checkedStatus, setCheckedStatus] = useState(false);
  const [tugeegch, setTugeegch] = useState(null);

  const [showPopup, setShowPopup] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setErrorMsg('');
    let firstOrderUserIds = orders[0].back_office_user
      ? orders[0].back_office_user.split(',')
      : [];
    let firstOrderTugeegch;

    for (const id of firstOrderUserIds) {
      const user = users.find(usr => usr.user_id === Number(id));
      if (user.role === 2) {
        firstOrderTugeegch = user;
        setTugeegch(user);
        break;
      }
    }

    let allHasSameTugeegch = true;
    for (const order of orders) {
      const userIds = order.back_office_user
        ? order.back_office_user.split(',')
        : [];

      for (const id of userIds) {
        const user = users.find(usr => usr.user_id === Number(id));
        if (user.role === 2 && user.user_id !== firstOrderTugeegch.user_id) {
          allHasSameTugeegch = false;
          break;
        }
      }

      if (!allHasSameTugeegch) break;
    }

    if (!allHasSameTugeegch) {
      setErrorMsg(
        'Захиалгуудыг хариуцсан түгээгч өөр байгаа тул, ачилт үүсгэх боломжгүй!'
      );
      setShowAlert(true);
      return;
    }

    setCheckedTugeegchs(true);
  }, [orders, users]);

  useEffect(() => {
    if (!checkedTugeegchs) return;
    setErrorMsg('');

    for (const order of orders) {
      if (order.status === 3 || order.status === 5) {
        setErrorMsg(
          'Хүргэгдсэн эсвэл цуцлагдсан захиалга дээр ачилтын захиалга үүсгэх боломжгүй!'
        );
        setShowAlert(true);
        return;
      }
    }

    setCheckedStatus(true);
  }, [orders, checkedTugeegchs]);

  useEffect(() => {
    if (loading) return;

    setLoading(true);

    const productsCopy = [];

    for (const order of orders) {
      for (const product of order.line) {
        productsCopy.push(product);
      }
    }

    const productsId = [...new Set(productsCopy.map(prod => prod.product_id))];

    const uniqueProducts = [];

    for (const prodId of productsId) {
      let myProd = { count: 0, totalPrice: 0 };

      for (const product of productsCopy) {
        if (product.product_id === prodId) {
          myProd.product_id = product.product_id;
          myProd.count += product.quantity;
          myProd.totalPrice += product.price * product.quantity;
          myProd.product_image = product.product_image;
          myProd.product_name = product.product_name;
          myProd.product_brand_id = product.product_brand_id;
          myProd.product_bar_code = product.product_bar_code;
          myProd.product_sku = product.product_sku;
        }
      }

      uniqueProducts.push(myProd);
    }

    setProducts(uniqueProducts);
    setLoading(false);
  }, [orders]);

  useEffect(() => {
    const getShipments = async () => {
      try {
        setErrorMsg('');
        if (shipmentInvenLoading) return;
        setShipmentInvenLoading(true);

        const companyId = Number(userData.company_id.replaceAll('|', ''));

        const shipmentsUrl = `${process.env.REACT_APP_API_URL2}/api/shipment?supplierId=${companyId}`;

        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const res = await fetch(shipmentsUrl, requestOptions);
        const resData = await res.json();

        const orderIds = orders.map(order => order.order_id);

        for (const id of orderIds) {
          for (const shipment of resData) {
            const shipmentOrderids = shipment.orders
              ? shipment.orders.split(',').map(id => Number(id))
              : [];

            if (shipmentOrderids.includes(id) && shipment.status !== 3) {
              setErrorMsg(
                'Сонгосон захиалга дээр ачилтын захиалга үүссэн байна!'
              );
              setShowAlert(true);
              return;
            }
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setShipmentInvenLoading(false);
      }
    };

    getShipments();
  }, [orders]);

  const submitHandler = async () => {
    try {
      setErrorMsg('');
      if (loading) return;
      if (!checkedTugeegchs) return;
      if (!tugeegch) return;

      setLoading(true);

      const url = `${process.env.REACT_APP_API_URL2}/api/shipment`;
      const body = JSON.stringify({
        supplierId: Number(userData.company_id.replaceAll('|', '')),
        from: '',
        to: '',
        status: 1,
        orders: orders.map(order => order.order_id).join(','),
        tugeegchID: Number(tugeegch.user_id),
        products: products.map(prod => ({
          productId: prod.product_id,
          count: prod.count
        }))
      });
      const requestOptions = {
        method: 'POST',
        body,
        headers: myHeaders,
        redirect: 'follow'
      };

      const res = await fetch(url, requestOptions);
      const resData = await res.json();

      if (resData.acknowledged) {
        setChangedTugeegch(true);
        setShowPopup(true);
      } else {
        setErrorMsg('Алдаа гарсан тул дахин оролдоно уу!');
        setShowError(true);
      }
    } catch (error) {
      console.log(error);
      setErrorMsg('Алдаа гарсан тул дахин оролдоно уу!');
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={css.createShipmentContainer}>
        <div className={css.headerContainer}>
          <span>Ачилтын захиалга үүсгэх</span>
          <button onClick={closeHandler}>
            <img src={closeIcon} alt='Close' />
          </button>
        </div>

        <div className={css.contentContainer}>
          <div className={css.contentHeader}>
            <div className={css.fieldWrapper} style={{ width: 70 }}>
              <span className={css.fieldTitle}>Зураг</span>
              <Input type='text' size='small' disabled />
            </div>

            <div className={css.fieldWrapper} style={{ width: 140 }}>
              <span className={css.fieldTitle}>Бүтээгдэхүүний нэр</span>
              <Input type='text' size='small' placeholder='Хайх' />
            </div>

            <div className={css.fieldWrapper} style={{ width: 100 }}>
              <span className={css.fieldTitle}>Брэнд</span>
              <Dropdown />
            </div>

            <div className={css.fieldWrapper} style={{ width: 120 }}>
              <span className={css.fieldTitle}>Баркод</span>
              <Input type='text' placeholder='Хайх' size='small' />
            </div>

            <div className={css.fieldWrapper} style={{ width: 120 }}>
              <span className={css.fieldTitle}>SKU</span>
              <Input type='text' placeholder='Хайх' size='small' />
            </div>

            <div className={css.fieldWrapper} style={{ width: 90 }}>
              <span className={css.fieldTitle}>Тоо ширхэг</span>
              <Dropdown />
            </div>

            <div className={css.fieldWrapper} style={{ width: 116 }}>
              <span className={css.fieldTitle}>Нийт үнэ</span>
              <Input type='text' disabled size='small' />
            </div>
          </div>

          {!shipmentInvenLoading &&
            !loading &&
            checkedStatus &&
            products.length > 0 && (
              <div className={css.content}>
                {products.map((product, index) => {
                  return (
                    <SingleItem
                      key={index}
                      product={product}
                      zIndex={products.length - index}
                      index={index}
                    />
                  );
                })}
              </div>
            )}

          {!shipmentInvenLoading &&
            !loading &&
            checkedStatus &&
            products.length === 0 && (
              <div className={css.notFoundContainer}>
                <img src={notFound} alt='Not Found' />
                <span>Илэрц олдсонгүй</span>
              </div>
            )}

          {(loading || !checkedStatus || shipmentInvenLoading) && (
            <div className={css.loadingSpinner}>
              <LoadingSpinner />
            </div>
          )}
        </div>

        <div className={css.footerWrapper}>
          <div className={css.buttons}>
            <Button
              disabled={loading || !checkedTugeegchs}
              onClick={closeHandler}
              variant='secondary'
              size='medium'
            >
              Цуцлах
            </Button>
            <Button
              disabled={loading || !checkedTugeegchs}
              variant='primary'
              size='medium'
              onClick={submitHandler}
            >
              Илгээх
            </Button>
          </div>
        </div>
      </div>

      {showPopup && (
        <Modal width={300} height={300}>
          <div
            style={{
              width: '100%',
              height: '100%',
              padding: '39px 26px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div style={{ width: 78, height: 78, marginBottom: 12 }}>
              <img
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  aspectRatio: '1/1'
                }}
                src={okIcon}
                alt='Ok'
              />
            </div>
            <span
              style={{
                color: '#1A1A1A',
                fontSize: 22,
                lineHeight: '26px',
                fontWeight: 700,
                marginBottom: 30,
                textAlign: 'center'
              }}
            >
              Ачилтын захиалга илгээгдлээ
            </span>
            <Button
              onClick={() => {
                setShowPopup(false);
                closeHandler();
              }}
              size='medium'
              variant='primary'
              width='100%'
            >
              OK
            </Button>
          </div>
        </Modal>
      )}

      {showAlert && (
        <ErrorPopup
          message={errorMsg}
          closeHandler={() => {
            setShowAlert(false);
            closeHandler();
          }}
        />
      )}

      {showError && (
        <ErrorPopup
          message={errorMsg}
          closeHandler={() => {
            setShowError(false);
          }}
        />
      )}
    </>
  );
};

export default ShipmentCreate;

const SingleItem = props => {
  const { product, zIndex } = props;

  return (
    <div className={`${css.singleItemWrapper}`} style={{ zIndex }}>
      <div className={css.singleFieldWrapper} style={{ width: 70 }}>
        <img
          src={product.product_image}
          alt={product.name}
          className={css.productImage}
        />
      </div>

      <div className={css.singleFieldWrapper} style={{ width: 140 }}>
        <span className={css.contentText}>{product.product_name}</span>
      </div>

      <div className={css.singleFieldWrapper} style={{ width: 100 }}>
        <span className={css.contentText}>Брэнд</span>
      </div>

      <div className={css.singleFieldWrapper} style={{ width: 120 }}>
        <span className={css.contentText}>{product.product_bar_code}</span>
      </div>

      <div className={css.singleFieldWrapper} style={{ width: 120 }}>
        <span className={css.contentText}>{product.product_sku}</span>
      </div>

      <div className={css.singleFieldWrapper} style={{ width: 90 }}>
        <span className={css.contentText}>{product.count}ш</span>
      </div>

      <div className={css.singleFieldWrapper} style={{ width: 116 }}>
        <span className={css.contentText}>
          {product.totalPrice.toLocaleString()}₮
        </span>
      </div>
    </div>
  );
};
