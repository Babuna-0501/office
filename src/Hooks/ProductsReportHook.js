import React, { useState, useEffect } from "react";
import myHeaders from "../components/MyHeader/myHeader";

const Ctx = React.createContext();

export const ProductReportHook = (props) => {
  const [massExport, setMassExport] = useState(false);
  const [newProduct, setNewProduct] = useState(false);
  const [massImport, setMassImport] = useState(false);
  const [massUpdate, setMassUpdate] = useState(false);
  const [massImportZagvar, setMassImportZagvar] = useState(false);
  const [selectedProductsId, setSelectedProductsId] = useState(false);
  const [sitedata, setSitedata] = useState([]);
  const [productsAll, setProductsAll] = useState([]);
  const [zones, setZones] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [namesearch, setNamesearch] = useState("");
  const [searchValues, setSearchValues] = useState({
    BuschlelSongoh: "",
    Created: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [selectedZone, setSelectedZone] = useState([]);
  const [chosedProducts, setChosedProducts] = useState([]);
  const [uploadProducts, setUploadProducts] = useState([]);
  const [suplier, setSuplier] = useState(null);
  const [shopIDS, setShopIDS] = useState([]);
  const [oneSupplier, setOneSupplier] = useState(null);
  const [importData, setImportData] = useState([]);
  const [minAmount, setMinAmount] = useState(null);
  const [bustype, setBustype] = useState([]);
  const [oronNutagdata, setOronNutagdata] = useState([]);
  const [busIDS, setBusIDS] = useState([]);
  const [busIDStwo, setBusIDStwo] = useState([]);
  const [nutagdata, setNutagdata] = useState([]);
  const [allCat, setAllCat] = useState([]);
  const [tradeshopIDS, setTradeshopIDS] = useState([]);
  const [channelSet, setChannelSet] = useState(false);
  const [channelID, setChannelID] = useState([]);
  const [render, setRender] = useState(false);
  const [warehouseall, setWarehouseall] = useState();
  const [warehouseData, setWarehouseData] = useState([]);

  const warehousealls = async () => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let urlNew = `https://api2.ebazaar.mn/api/warehouse`;
    await fetch(urlNew, requestOptions)
      .then((r) => r.json())
      .then((response) => {
        setWarehouseall(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    warehousealls();
  }, []);

  useEffect(() => {
    if (warehouseall && warehouseall.length > 0) {
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const warehouse = () => {
        const warehouseIds = warehouseall
          .map((warehouse) => warehouse._id)
          .join(",");
        const url = `https://api2.ebazaar.mn/api/warehouse?&allProducts=true`;

        fetch(url, requestOptions)
          .then((r) => r.json())
          .then((response) => {
            setWarehouseData(response);
          })
          .catch((error) => console.log("error", error));
      };

      warehouse();
    }
  }, [warehouseall]);

  useEffect(() => {
    let controller = new AbortController();
    var myHeaders = new Headers();
    myHeaders.append(
      "ebazaar_token",
      localStorage.getItem("ebazaar_admin_token")
    );
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let url = `https://api2.ebazaar.mn/api/zones`;
    if (namesearch.length !== 0) {
      url += `?name=${namesearch}`;
    }

    fetch(url, requestOptions)
      .then((r) => r.json())
      .then((response) => {
        console.log("data buschlel", response.data);
        setData(response.data);
      })
      .catch((error) => console.log("error", error));
  }, [namesearch]);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    const fetchdata = async () => {
      const data = await fetch(
        "https://api.ebazaar.mn/api/site_data",
        requestOptions
      );
      const res = await data.json();

      let bus = await res.business_types.map((item) => {
        return {
          ...item,
          price: 0,
          chosed: true,
          priority: 0,
          deliver_fee: 0,
        };
      });

      let cat = await res.categories.map((item) => {
        return {
          ...item,
          chosed: true,
        };
      });

      setAllCat(cat);

      let oron = await res.location
        .filter((item) => item.parent_id === 0)
        .map((item) => {
          return {
            ...item,
            chosed: true,
          };
        });
      setNutagdata(oron);
      setBustype(bus);
      setSitedata(res);
    };
    try {
      fetchdata();
    } catch (error) {
      console.log("sitedata error ", error);
    }
  }, []);
  // console.log("newProduct", newProduct);
  return (
    <Ctx.Provider
      value={{
        warehouseData,
        massExport,
        setMassExport,
        newProduct,
        setNewProduct,
        massImport,
        setMassImport,
        massImportZagvar,
        setMassImportZagvar,
        selectedProductsId,
        setSelectedProductsId,
        sitedata,
        setSitedata,
        massUpdate,
        setMassUpdate,
        productsAll,
        setProductsAll,
        zones,
        selectedProduct,
        setSelectedProduct,
        namesearch,
        setNamesearch,
        searchValues,
        setSearchValues,
        searchTerm,
        setSearchTerm,
        data,
        setData,
        selectedZone,
        setSelectedZone,
        chosedProducts,
        setChosedProducts,
        uploadProducts,
        setUploadProducts,
        importData,
        setImportData,
        suplier,
        setSuplier,
        shopIDS,
        setShopIDS,
        oneSupplier,
        setOneSupplier,
        minAmount,
        setMinAmount,
        bustype,
        setBustype,
        oronNutagdata,
        setOronNutagdata,
        busIDS,
        setBusIDS,
        busIDStwo,
        setBusIDStwo,
        nutagdata,
        setNutagdata,
        allCat,
        setAllCat,
        tradeshopIDS,
        setTradeshopIDS,
        channelSet,
        setChannelSet,
        channelID,
        setChannelID,
        render,
        setRender,
      }}
    >
      {props.children}
    </Ctx.Provider>
  );
};

export default Ctx;
