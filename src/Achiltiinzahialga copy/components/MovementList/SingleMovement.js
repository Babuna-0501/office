import { useState } from 'react';
import css from './singleMovement.module.css';
import { Drawer } from '../common/Drawer';
import SingleMovementDetail from './SingleMovementDetail';
import { useEffect } from 'react';
import myHeaders from '../../../components/MyHeader/myHeader';

const SingleMovement = props => {
  const {
    zIndex,
    movement,
    inventories,
    users,
    setMovements,
    products: initialProducts,
    userData,
    getShipments
  } = props;

  const [outgoingInventory, setOutgoingInventory] = useState({});
  const [incomingInventory, setIncomingInventory] = useState({});

  const [showDetails, setShowDetails] = useState(false);
  const [difference, setDifference] = useState(false);

  const [products, setProducts] = useState([]);
  const [createdUser, setCreatedUser] = useState({});

  const [loading, setLoading] = useState(false);

  const [date] = useState(movement.createDate.split('T')[0]);
  const [time] = useState(movement.createDate.split('T')[1]);

  const [totalPrice, setTotalPrice] = useState(0);

  const [otherProducts, setOtherProducts] = useState([]);

  useEffect(() => {
    for (const product of movement.products) {
      if (product.count !== product.oldCount) {
        setDifference(true);
        break;
      }
    }
  }, []);

  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);

        const companyId =
          Number(userData.company_id.replaceAll('|', '')) === 1
            ? 1
            : Number(userData.company_id.replaceAll('|', ''));

        const shipmentsUrl = `${
          process.env.REACT_APP_API_URL2
        }/shipment?page=0&to=${
          movement.from
        }&supplierId=${companyId}&status=2&startDate=${`${date.split('-')[0]}-${
          date.split('-')[1]
        }-${date.split('-')[2]}`}&endDate=${`${date.split('-')[0]}-${
          date.split('-')[1]
        }-${date.split('-')[2]}`}&tugeegchID=${movement.tugeegchID}`;

        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const shipmentsRes = await fetch(shipmentsUrl, requestOptions);
        const shipmentData = await shipmentsRes.json();

        let prodIds = [];
        const prods = [];

        for (const shipment of shipmentData.data) {
          for (const prod of shipment.products) {
            prodIds.push(prod.productId);
            prods.push(prod);
          }
        }

        prodIds = [...new Set(prodIds)];
        const uniqueProds = [];

        for (const ids of prodIds) {
          const data = { id: ids, count: 0 };

          for (const prod of prods) {
            if (prod.productId === ids) {
              data.count += prod.count;
            }
          }

          uniqueProds.push(data);
        }

        setOtherProducts(uniqueProds);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (movement.shipmentNewType === 3) {
      getOrders();
    }
  }, [movement]);

  useEffect(() => {
    const userId = !movement.tugeegchID
      ? movement.createUser
      : movement.tugeegchID;
    setCreatedUser(users.find(user => user.user_id === userId));
  }, [users, movement]);

  useEffect(() => {
    const productsCopy = [];

    for (const prod of initialProducts) {
      for (const shipProd of movement.products) {
        if (prod._id === shipProd.productId) {
          productsCopy.push({ ...prod, ...shipProd });
          break;
        }
      }
    }

    let totalPriceCopy = 0;

    for (const product of productsCopy) {
      totalPriceCopy +=
        product.locations?.[`62f4aabe45a4e22552a3969f`]?.price?.channel?.[1] *
        product.count;
    }

    setTotalPrice(totalPriceCopy);

    setProducts(productsCopy);
  }, [initialProducts, movement]);

  useEffect(() => {
    for (const inventory of inventories) {
      if (inventory._id === movement.from) {
        setOutgoingInventory({ ...inventory });
      }

      if (inventory._id === movement.to) {
        setIncomingInventory({ ...inventory });
      }
    }
  }, [movement, inventories]);

  return (
    <>
      <div className={`${css.singleShipmentContainer}`} style={{ zIndex }}>
        <div className={css.singleShipmentWrapper}>
          {/* Id */}
          <div
            onClick={() => setShowDetails(true)}
            className={css.fieldWrapper}
            style={{
              width: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}
          >
            <span className={css.orderNumber}>{movement.id}</span>
          </div>

          {/* Status */}
          <div
            className={css.fieldWrapper}
            style={{
              width: 120,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {movement.status === 1 && (
              <div className={`${css.statusCard} ${css.pending}`}>
                Хүлээгдэж буй
              </div>
            )}
            {movement.status === 2 && (
              <div className={`${css.statusCard} ${css.confirmed}`}>
                Баталгаажсан
              </div>
            )}
            {movement.status === 3 && (
              <div className={`${css.statusCard} ${css.cancelled}`}>
                Цуцлагдсан
              </div>
            )}
          </div>

          {/* Product Pictures */}
          <div className={css.fieldWrapper} style={{ width: 160 }}>
            <div
              onClick={() => setShowDetails(true)}
              className={css.productPicturesContainer}
            >
              {products.slice(0, 4).map((product, index) => {
                return (
                  <div
                    key={`product-picture-${index}-${movement._id}`}
                    className={css.productPictureWrapper}
                    style={{ zIndex: products.length - index }}
                  >
                    <img src={product.image[0]} alt={product.name} />
                  </div>
                );
              })}
              {products.length > 4 && (
                <div
                  className={css.productPictureWrapper}
                  style={{
                    backgroundColor: '#F2F2F2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#1A1A1A',
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '-0.005em',
                    lineHeight: 15
                  }}
                >
                  +{products.length - 4}
                </div>
              )}
            </div>
          </div>

          {/* Price */}
          <div className={css.fieldWrapper} style={{ width: 130 }}>
            <span className={css.text}>{totalPrice.toLocaleString()}₮</span>
          </div>

          {/* Outgoing WareHouse */}
          <div className={css.fieldWrapper} style={{ width: 150 }}>
            <span className={css.text}>{outgoingInventory?.name}</span>
          </div>

          {/* Incoming WareHouse */}
          <div className={css.fieldWrapper} style={{ width: 150 }}>
            <span className={css.text}>{incomingInventory?.name}</span>
          </div>

          {/* Order Date */}
          <div className={css.fieldWrapper} style={{ width: 120 }}>
            <span className={css.text}>
              {date.split('-')[0]}.{date.split('-')[1]}.{date.split('-')[2]}
              <br />
              {time.split(':')[0]}:{time.split(':')[1]}
            </span>
          </div>

          {/* Hariutsagch */}
          <div className={css.fieldWrapper} style={{ width: 140 }}>
            <span className={css.text}>
              {createdUser && (
                <>
                  {' '}
                  {createdUser.role === 1 && 'ХТ'}
                  {createdUser.role === 2 && 'Түгээгч'}
                  {createdUser.role === 3 && 'Админ'}
                  {createdUser.role === 4 && 'Шууд борлуулагч'}
                  <br />
                  {createdUser.first_name ?? 'Нэргүй'}
                </>
              )}
            </span>
          </div>

          {/* Type */}
          <div className={css.fieldWrapper} style={{ width: 140 }}>
            <span className={css.text}>
              {movement.shipmentNewType === 1 && 'Ачилт'}
              {movement.shipmentNewType === 2 && 'Хөдөлгөөн'}
              {movement.shipmentNewType === 3 && 'Буцаалт'}
            </span>
          </div>

          {/* Return */}
          <div
            className={css.fieldWrapper}
            style={{
              width: 120,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3
            }}
          >
            {!loading &&
              movement.status === 1 &&
              movement.shipmentNewType === 3 && (
                <div className={`${css.returnStatus} ${css.pending}`}>
                  Хүлээгдэж буй
                </div>
              )}
            {!loading &&
              movement.status === 2 &&
              movement.shipmentNewType === 3 && (
                <>
                  <div
                    className={`${css.returnStatus} ${
                      !difference ? css.success : css.rejected
                    }`}
                  >
                    {!difference ? `Зөрүүгүй` : `Зөрүүтэй`}
                  </div>
                </>
              )}
            {loading && <span className={css.text}>Тооцоолж байна</span>}
          </div>
        </div>
      </div>

      {showDetails && (
        <Drawer closeHandler={() => setShowDetails(false)}>
          <SingleMovementDetail
            closeHandler={() => setShowDetails(false)}
            outgoingInventory={outgoingInventory}
            incomingInventory={incomingInventory}
            movement={movement}
            products={products}
            setMovements={setMovements}
            setShowDetails={setShowDetails}
            allInventories={inventories}
            setDifference={setDifference}
            getShipments={getShipments}
          />
        </Drawer>
      )}
    </>
  );
};

export default SingleMovement;
