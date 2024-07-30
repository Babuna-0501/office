import React, { useState, useEffect } from 'react';
import myHeaders from '../components/MyHeader/myHeader';

const Ctx = React.createContext();

export const SMSHook = props => {
  const [create, setCreate] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [uramshuulalOpen, setUramshuulalOpen] = useState(false);
  const [filteredXT, setFilteredXT] = useState([]);
  const [ids, setIds] = useState([]);
  const [role, setRole] = useState([]);
  const [prodIDS, setProdIDS] = useState([]);
  const [productModal, setProductModal] = useState(false);
  const [brandModal, setBrandModal] = useState(false);
  const [angilalModal, setAngilalModal] = useState(false);
  const [priceModal, setPriceModal] = useState(false);
  const [chosedProdIDS, setChosedProdIDS] = useState([]);
  const [sitedata, setSitedata] = useState([]);
  const [chosedChannel, setChosedChannel] = useState([]);
  const [zoneids, setZoneids] = useState([]);
  const [totalAmount, setTotalAmount] = useState(null);
  const [productData, setProductData] = useState(null);
  const [zoneData, setZoneData] = useState([]);
  const [chosedBrands, setChosedBrands] = useState([]);
  const [Angilaldata, setAngilaldata] = useState([]);
  const [collecttrue, setCollecttrue] = useState(false);
  const [collectTitle, setCollectTitle] = useState(null);
  const [multiProductQTY, setMultiProductQTY] = useState(null);
  const [multiProductTotal, setMultiProductTotal] = useState(null);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [bname, setBname] = useState(null);
  const [xt, setXt] = useState([]);
  const [shagnalname, setShagnalname] = useState(null);
  const [startdate, setStartdate] = useState(null);
  const [enddate, setEnddate] = useState(null);
  const [updateTrue, setUpdateTrue] = useState(false);
  const [updateID, setUpdateID] = useState(null);
  const [brandsdata, setBrandsdata] = useState([]);
  const [categoriesdata, setCategoriesdata] = useState([]);
  const [multiProductIDS, setMultiProductIDS] = useState([]);
  const [multiProducts, setMultiProducts] = useState([]);
  const [multiProductsTitle, setMultiProductsTitle] = useState(null);
  const [prizeImage, setPrizeImage] = useState(null);
  const [data, setData] = useState([]);
  const [supplierInfo, setSupplierInfo] = useState(null);
  const [reportOpen, setReportOpen] = useState(false);
  const [barOpen, setBarOpen] = useState(false);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(
      `${process.env.REACT_APP_API_URL2}/api/backoffice/role`,
      requestOptions
    )
      .then(res => res.json())
      .then(res => {
        setRole(res.roles);
      })
      .catch(error => {
        console.log('error', error);
      });
    fetch(`${process.env.REACT_APP_API_URL}/api/site_data`, requestOptions)
      .then(res => res.json())
      .then(res => {
        setSitedata(res);
      })
      .catch(error => {
        console.log('error', error);
      });

    fetch(`${process.env.REACT_APP_API_URL2}/api/zones`, requestOptions)
      .then(res => res.json())
      .then(res => {
        // console.log("res", res);
        let update = res.data.map(item => {
          return {
            ...item,
            chosed: false
          };
        });
        setZoneData(update);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);

  return (
    <Ctx.Provider
      value={{
        create,
        setCreate,
        modalOpen,
        setModalOpen,
        ids,
        setIds,
        role,
        uramshuulalOpen,
        setUramshuulalOpen,
        filteredXT,
        setFilteredXT,
        prodIDS,
        setProdIDS,
        productModal,
        setProductModal,
        chosedProdIDS,
        setChosedProdIDS,
        sitedata,
        chosedChannel,
        setChosedChannel,
        zoneids,
        setZoneids,
        totalAmount,
        setTotalAmount,
        productData,
        setProductData,
        zoneData,
        setZoneData,
        brandModal,
        setBrandModal,
        angilalModal,
        setAngilalModal,
        priceModal,
        setPriceModal,
        chosedBrands,
        setChosedBrands,
        Angilaldata,
        setAngilaldata,
        collecttrue,
        setCollecttrue,
        collectTitle,
        setCollectTitle,
        multiProductQTY,
        setMultiProductQTY,
        multiProductTotal,
        setMultiProductTotal,
        inputDisabled,
        setInputDisabled,
        xt,
        setXt,
        bname,
        setBname,
        shagnalname,
        setShagnalname,
        startdate,
        setStartdate,
        enddate,
        setEnddate,
        updateTrue,
        setUpdateTrue,
        updateID,
        setUpdateID,
        brandsdata,
        setBrandsdata,
        categoriesdata,
        setCategoriesdata,
        multiProductIDS,
        setMultiProductIDS,
        multiProducts,
        setMultiProducts,
        multiProductsTitle,
        setMultiProductsTitle,
        data,
        setData,
        prizeImage,
        setPrizeImage,
        supplierInfo,
        setSupplierInfo,
        barOpen,
        setBarOpen,
        reportOpen,
        setReportOpen
      }}
    >
      {props.children}
    </Ctx.Provider>
  );
};

export default Ctx;
