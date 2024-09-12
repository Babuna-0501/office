import React, { useState, useEffect, useContext } from 'react';
import AppHook from './AppHook';
import myHeaders from '../components/MyHeader/myHeader';

const Ctx = React.createContext();

export const PromoHook = props => {
  const [data, setData] = useState([]);
  const [newPromoAdd, setNewPromoAdd] = useState(false);
  const [updateDisProd, setUpdateDisProd] = useState(false);
  const [willUpdateProd, setWillUpdateProd] = useState({});
  const [products, setProducts] = useState([]);
  const [nextPage, setNextPage] = useState(false);
  const [channel, setChannel] = useState(false);
  const [promoChannel, setPromoChannel] = useState([]);
  const [settingActive, setSettingActive] = useState(null);
  const [promoProductAdd, setPromoProductAdd] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [supplierID, setSupplierID] = useState(null);
  const [supplierName, setSupplierName] = useState(null);
  const [brands, setBrands] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [discountTypeSelect, setDiscountTypeSelect] = useState();
  const [deleteBTN, setDeleteBTN] = useState(false);

  const [startDateValue, setStartDateValue] = useState(null);
  const [endDateValue, setEndDateValue] = useState(null);
  const [priceAndQuantity, setPriceAndQuantity] = useState(null);
  const [proUpdate, setProUpdate] = useState(false);
  const [newProd, setNewProd] = useState(true);
  const [discountChannel, setDiscountChannel] = useState([]);
  const [giftQty, setQiftQty] = useState('');
  const [thresholdQty, setThresholdQty] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [giftProd, setGiftProd] = useState(false);
  const [giftProduct, setGiftProduct] = useState([]);
  const [productUpdate, setProductUpdate] = useState(false);
  //// zones hook
  const [zonesmodal, setZonesmodal] = useState(false);
  const [zonessidebar, setZonessidebar] = useState(false);
  const [zoneMap, setZoneMap] = useState([]);
  /////
  const [thresholdList, setThresholdList] = useState([
    { price: '', percent: '' }
  ]);
  const [thresholdType, setThresholdType] = useState(1);
  const [productTypeSelect, setProductTypeSelect] = useState(1600);
  const [selectedCollection, setSelectedCollection] = useState([]);
  const [collectionProduct, setCollectionProduct] = useState([]);
  const [productwithPromo, setProductwithPromo] = useState([]);
  const [settingIndex, setSettingIndex] = useState(null);
  const [productIDS, setProductIDS] = useState([]);

  const appctx = useContext(AppHook);

  // console.log("willUpdateProd", willUpdateProd);

  useEffect(() => {
    if (willUpdateProd?.discount_data?.type === 'percent') {
      setSettingIndex(0);
    } else {
      setSettingIndex(1);
    }
  }, []);
  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders
    };
    fetch(`${process.env.REACT_APP_API_URL2}/api/brands`, requestOptions)
      .then(r => r.json())
      .then(res => {
        setBrands(res.data);
      })
      .catch(error =>
        console.log('brands tathad aldaa garlaa' + error.message)
      );
  }, []);
  // console.log("products", products);

  const UpdateHandler = () => {
    let mainData;

    let chanID = [];
    discountChannel?.map(item => {
      chanID.push(item.business_type_id);
    });

    if (willUpdateProd.discount_data.discounttype === 1) {
      ///// Энэ хэсэг хувийн хямдралын урамшуулалын шинэчлэл бодож байна
      console.log('AAA');

      mainData = {
        discount_id: willUpdateProd._id,
        supplierID: willUpdateProd.supplierID,
        is_active: willUpdateProd.is_active,
        start_date: willUpdateProd.start_date,
        end_date: willUpdateProd.end_date,
        products: willUpdateProd.products,
        insert_date: willUpdateProd.insert_date,
        conditions: [],
        channel_id: willUpdateProd.channel_id,
        locations: willUpdateProd.locations,
        skus: willUpdateProd.skus,

        discount_data: {
          title: willUpdateProd.discount_data.title,
          description: willUpdateProd.discount_data.description,
          discounttype: settingIndex === 1 ? 1 : 1,
          threshold_amount:
            settingIndex === 1
              ? Number(willUpdateProd.discount_data.threshold_amount)
              : 0,
          type: settingIndex === 1 ? 'amount' : 'percent',
          value: Number(willUpdateProd.discount_data.value)
        }
      };
    }
    if (willUpdateProd.discount_data.discounttype === 3) {
      console.log('CCC');
      let data = [];
      console.log('giftproduct', giftProduct);

      willUpdateProd.conditions.map(item => {
        if (item.is_gift === false) {
          data.push({
            ...item,
            threshold_qty: Number(thresholdQty)
          });
        } else if (item.is_gift === true) {
          data.push({
            ...item,
            gift_qty: Number(giftQty)
          });
        }
      });

      mainData = {
        discount_id: willUpdateProd._id,
        discount_data: {
          ...willUpdateProd.discount_data,
          title: willUpdateProd.discount_data.title,
          type: willUpdateProd.discount_data.type,
          value: Number(willUpdateProd.discount_data.value),
          threshold_amount: willUpdateProd.discount_data.threshold_amount,
          description: willUpdateProd.discount_data.description
        },
        start_date: willUpdateProd.start_date,
        end_date: willUpdateProd.end_date,
        is_active: 1,
        products: [...willUpdateProd.products],
        locations: [...willUpdateProd.locations],
        channel_id: [...willUpdateProd.channel_id],
        supplierID: willUpdateProd.supplierID,
        conditions: data,
        // conditions: [...willUpdateProd.conditions],
        insert_date: willUpdateProd.insert_date,
        skus: [...willUpdateProd.skus]
      };
    }

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(mainData)
      // body: mainData,
    };
    console.log('Update okay+++', requestOptions);
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/discount/update`,
      requestOptions
    )
      .then(r => r.json())
      .then(r => {
        console.log('successfull', r);

        setWillUpdateProd({});
        setProducts([]);
        appctx.setPage(['discount']);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  return (
    <Ctx.Provider
      value={{
        newPromoAdd,
        setNewPromoAdd,
        channel,
        setChannel,
        promoChannel,
        setPromoChannel,
        promoProductAdd,
        setPromoProductAdd,
        selectedProducts,
        setSelectedProducts,
        supplierID,
        setSupplierID,
        supplierName,
        setSupplierName,
        brands,
        discountTypeSelect,
        setDiscountTypeSelect,
        updateDisProd,
        setUpdateDisProd,
        data,
        setData,
        willUpdateProd,
        setWillUpdateProd,
        nextPage,
        setNextPage,
        products,
        setProducts,
        selectedRowData,
        setSelectedRowData,
        deleteModal,
        setDeleteModal,
        settingActive,
        setSettingActive,
        startDateValue,
        setStartDateValue,
        endDateValue,
        setEndDateValue,
        priceAndQuantity,
        setPriceAndQuantity,
        proUpdate,
        setProUpdate,
        newProd,
        setNewProd,

        UpdateHandler,
        discountChannel,
        setDiscountChannel,
        searchValue,
        setSearchValue,
        giftQty,
        setQiftQty,
        giftProd,
        setGiftProd,
        giftProduct,
        setGiftProduct,
        productUpdate,
        setProductUpdate,
        zonesmodal,
        setZonesmodal,
        zonessidebar,
        setZonessidebar,
        zoneMap,
        setZoneMap,
        deleteBTN,
        setDeleteBTN,
        thresholdList,
        setThresholdList,
        thresholdType,
        setThresholdType,
        productTypeSelect,
        setProductTypeSelect,
        selectedCollection,
        setSelectedCollection,
        collectionProduct,
        setCollectionProduct,
        productwithPromo,
        setProductwithPromo,
        settingIndex,
        setSettingIndex,
        thresholdQty,
        setThresholdQty,
        productIDS,
        setProductIDS
      }}
    >
      {props.children}
    </Ctx.Provider>
  );
};

export default Ctx;
