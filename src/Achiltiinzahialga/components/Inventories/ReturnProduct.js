import { Button, Input, Modal } from '../common';
import css from './returnProduct.module.css';
import arrowDown from '../../../assets/shipment/arrow-down-shipment.svg';
import closeIcon from '../../../assets/shipment/closeIcon.svg';
import filterIcon from '../../../assets/shipment/filterIcon.svg';
import filterSubmit from '../../../assets/shipment/filterSubmit.svg';
import arrowRight from '../../../assets/shipment/arrow-right.svg';
import { useState, useEffect } from 'react';
import myHeaders from '../../../components/MyHeader/myHeader';
import { Drawer } from '../common/Drawer';
import LoadingSpinner from '../../../components/Spinner/Spinner';
import okIcon from '../../../assets/shipment/ok.svg';
import ErrorPopup from '../common/ErrorPopup';

const ReturnProduct = props => {
  const { inventory, allInventories, setShipmentReturn, userData } = props;

  const [products, setProducts] = useState([]);
  const [selectedInventory, setSelectedInventory] = useState('');

  const [showSubmit, setShowSubmit] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsIds = [];

        for (const product of inventory.products) {
          productsIds.push(Object.keys(product)[0]);
        }

        const url = `${
          process.env.REACT_API_URL2
        }/products/get1?ids=[${productsIds.join(',')}]`;
        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const res = await fetch(url, requestOptions);
        const resData = await res.json();

        const productsCopy = [];

        for (const product of inventory.products) {
          const curProduct = resData.data.find(
            prod => Number(Object.keys(product)[0]) === prod._id
          );
          if (curProduct) {
            productsCopy.push({
              ...curProduct,
              myStock: product[Object.keys(product)[0]]
            });
          }
        }

        setProducts(productsCopy.filter(prod => prod.myStock > 0));
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, [inventory]);

  const submitHandler = () => {
    setErrorMsg('');

    if (selectedInventory === '') {
      setErrorMsg('Агуулхаа сонгоно уу!');
      setShowError(true);
      return;
    }
    setShowSubmit(true);
  };

  return (
    <>
      <div className={css.detailsContainer}>
        <div className={css.headerWrapper}>
          <h1 className={css.title}>Ачилтын захиалга илгээх</h1>
          <button
            onClick={() => setShipmentReturn(false)}
            className={css.closeBtn}
          >
            <img src={closeIcon} alt='Close' />
          </button>
        </div>

        <div className={css.inventoryWrapper}>
          <Input type='text' value={inventory?.name} size='medium' disabled />
          <div className={css.arrowWrapper}>
            <img src={arrowRight} alt='Arrow Right' />
          </div>
          <Input
            type='text'
            value={
              selectedInventory === ''
                ? ''
                : allInventories.find(inven => inven._id === selectedInventory)
                    .name ?? ''
            }
            size='medium'
            disabled
          />
        </div>

        <div className={css.filterWrapper}>
          <div className={css.inventoryFilter}>
            <select
              value={selectedInventory}
              onChange={e => setSelectedInventory(e.target.value)}
              style={{ backgroundImage: `url(${arrowDown})` }}
            >
              <option value={''}>Агуулах сонгох</option>
              {allInventories
                .filter(inven => inven._id !== inventory._id)
                .map(inventory => {
                  return (
                    <option
                      key={`inventory-return-inv-${inventory._id}`}
                      value={inventory._id}
                    >
                      {inventory.name}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className={css.categoryFilter}>
            <input type='text' />
            <img src={filterIcon} alt='Filter' />
          </div>

          <div className={css.brandFilter}>
            <input type='text' />
            <img src={filterIcon} alt='Filter' />
          </div>

          <button className={css.filterBtn}>
            <img src={filterSubmit} alt='Submit Filter' />
          </button>
        </div>

        <div className={css.productsWrapper}>
          {products.map(product => {
            return (
              <SingleItem
                key={`inventory-return-single-product-${product.product_id}`}
                product={product}
              />
            );
          })}
        </div>
      </div>

      <div className={css.footerWrapper}>
        <div className={css.footerBtns}>
          <Button
            onClick={submitHandler}
            size='large'
            variant='primary'
            width={250}
          >
            Үргэлжлүүлэх
          </Button>
        </div>
      </div>

      {showSubmit && (
        <Drawer backdrop='transparent'>
          <SubmitReturn
            {...{
              setShowSubmit,
              selectedInventory: allInventories.find(
                inven => inven._id === selectedInventory
              ),
              inventory,
              products,
              setShipmentReturn,
              userData
            }}
          />
        </Drawer>
      )}

      {showError && (
        <ErrorPopup
          message={errorMsg}
          closeHandler={() => setShowError(false)}
        />
      )}
    </>
  );
};

export default ReturnProduct;

const SingleItem = props => {
  const { product } = props;
  const [count, setCount] = useState(product.myStock);

  const price =
    product.locations?.[`62f4aabe45a4e22552a3969f`]?.price?.channel?.['1'] ?? 0;

  return (
    <div key={`product-card`} className={css.productCardContainer}>
      <div className={css.productCard}>
        <div className={css.productImageWrapper}>
          <img src={product.image[0]} alt={product.name} />
        </div>

        <div className={css.productDetailsWrapper}>
          <div>
            <span className={css.productName}>{product.name}</span>
            <span className={css.productInfo}>
              SKU: {product.sku} / Barcode: {product.bar_code}
            </span>
            <span className={css.productPrice}>
              <span>{price.toLocaleString()}₮</span>x {count} =
              <span>{(price * count).toLocaleString()}₮</span>
            </span>
          </div>

          <div className={css.productCountBtns}>
            <label>Үлдэгдэл: </label>
            <input
              type='number'
              value={count}
              onChange={e => setCount(Number(e.target.value))}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const SubmitReturn = props => {
  const {
    setShowSubmit,
    selectedInventory,
    inventory,
    products,
    setShipmentReturn,
    userData
  } = props;

  const [submitting, setSubmitting] = useState(false);
  const [submitDone, setSubmitDone] = useState(false);

  const [totalPrice] = useState(
    products.reduce(
      (acc, prod) =>
        acc +
        prod.locations?.[`62f4aabe45a4e22552a3969f`]?.price?.channel?.[1] *
          prod.myStock,
      0
    )
  );
  const [totalCount] = useState(
    products.reduce((acc, prod) => acc + prod.myStock, 0)
  );
  const [categoyIdCount] = useState(products.length);

  const [errorMsg, setErrorMsg] = useState('');
  const [showError, setShowError] = useState(false);

  const submitHandler = async () => {
    try {
      if (submitting) return;

      setSubmitting(true);

      setErrorMsg('');

      const url = `${process.env.REACT_APP_API_URL2}/api/shipment`;
      const body = JSON.stringify({
        supplierId: Number(userData.company_id.replaceAll('|', '')),
        from: inventory._id,
        to: selectedInventory._id,
        status: 1,
        products: products.map(prod => ({
          productId: prod._id,
          count: prod.myStock
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
        setSubmitDone(true);
      } else {
        throw Error();
      }
    } catch (error) {
      setErrorMsg('Ачилтын захиалга үүсгэхэд алдаа гарлаа!');
      setShowError(true);
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className={css.detailsContainer}>
        <div className={css.headerWrapper}>
          <h1 className={css.title}>Ачилтын захиалга илгээх</h1>
          <button onClick={() => setShowSubmit(false)} className={css.closeBtn}>
            <img src={closeIcon} alt='Close' />
          </button>
        </div>

        <div className={css.inventoryWrapper}>
          <Input type='text' value={inventory?.name} size='medium' disabled />
          <div className={css.arrowWrapper}>
            <img src={arrowRight} alt='Arrow Right' />
          </div>
          <Input
            type='text'
            value={selectedInventory?.name}
            size='medium'
            disabled
          />
        </div>

        {!submitting && (
          <div className={css.productsWrapper}>
            {products.map((prod, index) => {
              const singleTotalPrice =
                prod.locations?.[`62f4aabe45a4e22552a3969f`]?.price
                  ?.channel?.[1] * prod.myStock;

              return (
                <div
                  key={`inventory-return-shipment-product-detail-${prod.product_id}`}
                  style={{
                    padding: '10px 16px',
                    boxShadow: '0px 0.800000011920929px 0px 0px #0000001A'
                  }}
                >
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: 16 }}
                  >
                    <span
                      style={{
                        flex: 1,
                        color: '#1A1A1A',
                        fontSize: 12,
                        lineHeight: '15px'
                      }}
                    >
                      {prod.name}
                    </span>

                    <span
                      style={{
                        color: '#1A1A1A',
                        fontSize: 12,
                        lineHeight: '15px',
                        textAlign: 'center'
                      }}
                    >
                      {prod.myStock.toLocaleString()}ш
                    </span>

                    <span
                      style={{
                        color: '#1A1A1A',
                        fontSize: 12,
                        lineHeight: '15px'
                      }}
                    >
                      {singleTotalPrice.toLocaleString()}₮
                    </span>
                  </div>
                </div>
              );
            })}
            <div
              style={{
                padding: '10px 16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    flex: 1,
                    color: '#1A1A1A',
                    fontSize: 15,
                    lineHeight: '18px',
                    fontWeight: 600
                  }}
                >
                  {categoyIdCount.toLocaleString()} төрөл /{' '}
                  {totalCount.toLocaleString()} бүтээгдэхүүн
                </span>

                <span
                  style={{
                    color: '#1A1A1A',
                    fontSize: 15,
                    lineHeight: '18px',
                    fontWeight: 600
                  }}
                >
                  {totalPrice.toLocaleString()}₮
                </span>
              </div>
            </div>
          </div>
        )}

        {submitting && (
          <div className={css.loadingWrapper}>
            <LoadingSpinner />
          </div>
        )}
      </div>

      <div className={css.footerWrapper} style={{ height: 108 }}>
        <div className={css.footerInfo}>
          <span
            style={{
              color: '#1A1A1A',
              fontSize: 18,
              lineHeight: '22px',
              fontWeight: 400
            }}
          >
            Нийт үнийн дүн:
          </span>
          <span className={css.shipmentAmount}>
            {totalPrice.toLocaleString()}₮
          </span>
        </div>
        <div className={css.footerBtns}>
          <Button
            onClick={() => setShowSubmit(false)}
            size='large'
            variant='secondary'
            width={250}
            disabled={submitting}
          >
            Буцах
          </Button>
          <Button
            onClick={submitHandler}
            size='large'
            variant='primary'
            width={250}
            disabled={submitting}
          >
            Илгээх
          </Button>
        </div>
      </div>

      {submitDone && (
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
                setSubmitDone(false);
                setShowSubmit(false);
                setShipmentReturn(false);
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

      {showError && (
        <ErrorPopup
          message={errorMsg}
          closeHandler={() => setShowError(false)}
        />
      )}
    </>
  );
};
