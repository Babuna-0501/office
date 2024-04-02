import { useContext, useEffect, useState } from "react";
import InventoryProductHeader from "./InventoryProductHeader";
import SingleInventoryProduct from "./SingleInventoryProduct";
import css from "./inventoryProducts.module.css";
import { ShipmentContext } from "../../../Hooks/ShipmentHook";
import { Drawer } from "../common/Drawer";
import packageIcon from "../../../assets/shipment/package.svg";
import myHeaders from "../../../components/MyHeader/myHeader";
import LoadingSpinner from "../../../components/Spinner/Spinner";
import ReturnProduct from "./ReturnProduct";
import { Modal } from "../common";
import CreateShipmentModal from "./CreateShipmentModal";

const InventoryProducts = (props) => {
  const { inventory, allInventories, userData, users } = props;
  const {
    createInventoryShipmentOrder,
    setCreateInventoryShipmentOrder,
    shipmentReturn,
    setShipmentReturn,
  } = useContext(ShipmentContext);

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const url = `https://api2.ebazaar.mn/api/warehouse/get/new?id=${inventory._id}&allProducts=true`;
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const res = await fetch(url, requestOptions);
      const resData = await res.json();

      setProducts(resData.data[0].products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [inventory]);

  return (
    <div className={css.container}>
      <InventoryProductHeader />
      <div className={css.products}>
        {products.map((product, index) => (
          <SingleInventoryProduct
            setProductData={props.setProductData}
            product={product}
            index={index}
            setActiveTab={props.setActiveTab}
          />
        ))}
      </div>
    </div>
  );
};

export default InventoryProducts;
