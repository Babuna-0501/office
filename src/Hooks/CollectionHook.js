import React, { useState, useEffect } from "react";

const Ctx = React.createContext();

export const CollectionHook = (props) => {
  const [collectionModal, setCollectionModal] = useState(false);
  const [productModal, setProductModal] = useState(false);
  const [productIDS, setProductIDS] = useState([]);
  const [update, setUpdate] = useState(false);
  const [updateProduct, setUpdateProduct] = useState([]);
  const [newWarehouseOpen, setNewWarehouseOpen] = useState(false);
  const [baraaTatah, setBaraaTatah] = useState(false);
  const [baraaOrlogo, setBaraaOrlogo] = useState(false);
  const [orlogoType, setOrlogoType] = useState(false);
  const [solio, setSolio] = useState(false);

  return (
    <Ctx.Provider
      value={{
        collectionModal,
        setCollectionModal,
        productModal,
        setProductModal,
        productIDS,
        setProductIDS,
        update,
        setUpdate,
        updateProduct,
        setUpdateProduct,
        newWarehouseOpen,
        setNewWarehouseOpen,
        baraaTatah,
        setBaraaTatah,
        orlogoType,
        setOrlogoType,
        baraaOrlogo,
        setBaraaOrlogo,
        solio,
        setSolio,
      }}
    >
      {props.children}
    </Ctx.Provider>
  );
};

export default Ctx;
