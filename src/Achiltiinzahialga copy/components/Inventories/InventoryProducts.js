import { useContext, useEffect, useState } from 'react';
import InventoryProductHeader from './InventoryProductHeader';
import SingleInventoryProduct from './SingleInventoryProduct';
import css from './inventoryProducts.module.css';
import { ShipmentContext } from '../../../Hooks/ShipmentHook';
import { Drawer } from '../common/Drawer';
import packageIcon from '../../../assets/shipment/package.svg';
import myHeaders from '../../../components/MyHeader/myHeader';
import LoadingSpinner from '../../../components/Spinner/Spinner';
import ReturnProduct from './ReturnProduct';
import { Modal } from '../common';
import CreateShipmentModal from './CreateShipmentModal';

const InventoryProducts = props => {
  const { inventory, allInventories, userData, users } = props;
  const {
    createInventoryShipmentOrder,
    setCreateInventoryShipmentOrder,
    shipmentReturn,
    setShipmentReturn
  } = useContext(ShipmentContext);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [productChecks, setProductChecks] = useState([]);
  const [checkedProducts, setCheckedProducts] = useState([]);

  const [selectedInven, setSelectedInven] = useState(null);

  // Filter States
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [barcode, setBarcode] = useState('');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const getCategories = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}/api/site_data`;
        const requestOption = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const res = await fetch(url, requestOption);
        const resData = await res.json();

        setCategories(resData.categories);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        if (loading) return;
        setLoading(true);

        const currentInventory = allInventories.find(
          inven => inven._id === inventory._id
        );
        const prodIds = [];

        for (const prod of currentInventory.products) {
          prodIds.push(Object.keys(prod)[0]);
        }

        const url = `${
          process.env.REACT_APP_API_URL2
        }/products/get1?ids=[${prodIds.join(',')}]`;
        const requestOption = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const res = await fetch(url, requestOption);
        const resData = await res.json();

        const productsCopy = [];

        for (const product of currentInventory.products) {
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

        setSelectedInven(currentInventory);
        setProductChecks(resData.data.map(() => false));
        setProducts(productsCopy);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [inventory, allInventories]);

  useEffect(() => {
    let checkedProductsCopy = [...checkedProducts];

    productChecks.map((val, index) => {
      if (val) {
        checkedProductsCopy[index] = products[index];
      } else {
        checkedProductsCopy[index] = null;
      }
    });

    setCheckedProducts(checkedProductsCopy);
  }, [productChecks]);

  useEffect(() => {
    let filteredProductsCopy = [...products];

    if (name !== '') {
      filteredProductsCopy = filteredProductsCopy.filter(prod =>
        prod.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (barcode !== '') {
      filteredProductsCopy = filteredProductsCopy.filter(
        prod => prod.bar_code === barcode
      );
    }

    if (sku !== '') {
      filteredProductsCopy = filteredProductsCopy.filter(
        prod => prod.sku === sku
      );
    }

    if (price !== '') {
      filteredProductsCopy = filteredProductsCopy.filter(
        prod =>
          prod.locations?.['62f4aabe45a4e22552a3969f']?.price?.channel?.[1] ===
          Number(price)
      );
    }

    setFilteredProducts(filteredProductsCopy);
  }, [products, name, barcode, sku, price]);

  const allCheckHandler = () => {
    if (productChecks.filter(check => check).length === productChecks.length) {
      setProductChecks(prev => prev.map(() => false));
    } else {
      setProductChecks(prev => prev.map(() => true));
    }
  };

  const singleCheckHandler = index => {
    setProductChecks(prev =>
      prev.map((val, ind) => (ind === index ? !val : val))
    );
  };

  return (
    <>
      <div className={css.productDetailsContainer}>
        <InventoryProductHeader
          zIndex={products.length + 1}
          checkHandler={allCheckHandler}
          checked={productChecks.every(val => val)}
          categories={categories}
          {...{
            name,
            setName,
            category,
            setCategory,
            barcode,
            setBarcode,
            sku,
            setSku,
            price,
            setPrice
          }}
        />

        <div className={css.contentContainer}>
          {loading && (
            <div className={css.loadingWrapper}>
              <LoadingSpinner />
            </div>
          )}

          {!loading &&
            filteredProducts.length > 0 &&
            filteredProducts.map((product, index) => {
              return (
                <SingleInventoryProduct
                  key={`single-inventory-product-${product.product_id}`}
                  zIndex={products.length - index}
                  product={product}
                  categories={categories}
                  checked={productChecks[index]}
                  checkHandler={() => singleCheckHandler(index)}
                />
              );
            })}
          {!loading && filteredProducts.length === 0 && (
            <div className={css.productEmptyWrapper}>
              <img src={packageIcon} alt='Package' />
              <span>Агуулах хоосон байна</span>
            </div>
          )}
        </div>
      </div>

      {createInventoryShipmentOrder && (
        <Modal
          width={770}
          height={770}
          closeHandler={() => setCreateInventoryShipmentOrder(false)}
        >
          <CreateShipmentModal
            inventory={inventory}
            allInventories={allInventories}
            closeHandler={() => setCreateInventoryShipmentOrder(false)}
            userData={userData}
            users={users}
          />
        </Modal>
      )}

      {shipmentReturn && (
        <Drawer closeHandler={() => setShipmentReturn(false)}>
          <ReturnProduct
            inventory={inventory}
            allInventories={allInventories}
            userData={userData}
            setShipmentReturn={setShipmentReturn}
          />
        </Drawer>
      )}
    </>
  );
};

export default InventoryProducts;
