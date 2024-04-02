import React from "react";
import css from "./chooseProducts.module.css";
import Configure from "./configure";
import ProductsHeader from "./productsHeader";
import ProductList from "./productList";
import { Button, Modal } from "../common";
import AddProduct from "./addProduct";
import { useState } from "react";
import myHeaders from "../../../components/MyHeader/myHeader";

const ChooseProducts = ({ closeHandler }) => {
  const [isAddProduct, setIsProduct] = useState(false);
  // for configure
  const [supplier, setSupplier] = useState("");
  const [toAguulah, setToAguulah] = useState("");
  const [fromAguulah, setFromAguulah] = useState("");
  const [description, setDescription] = useState("");
  // for productData
  const [productData, setProductdata] = useState([]);

  const [checkedProducts, setCheckedProducts] = useState([]);

  const truncater = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength - 3) + "...";
    } else {
      return text;
    }
  };

  const movementFun = async () => {
    try {
      productData.map((e) => {
        if (!e.quantity) {
          alert("Татах тоогоо оруулна уу!");
        }
      });

      let type = 0;
      const supplierId = supplier.id == 1 ? 13884 : supplier.id;

      const url = `https://api2.ebazaar.mn/api/shipment/create/final`;

      const body = {
        supplierId,
        type: type,
        note: description,
        products: productData,
        documentId: " ",
      };
      if (toAguulah && fromAguulah) {
        body.to = toAguulah;
        body.from = fromAguulah;
        body.type = 3;
      } else if (fromAguulah) {
        body.from = fromAguulah;
        body.type = 2;
      } else if (toAguulah) {
        body.to = toAguulah;
        body.type = 1;
      } else {
        alert("Агуулах сонгоно уу!");
      }

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
        redirect: "follow",
      };

      const res = await fetch(url, requestOptions);
      const resData = await res.json();

      if (resData.success) {
        alert("Хөдөлгөөн амжилттай үүслээ");
        closeHandler();
      } else {
        alert(resData?.data?.[0] || "Алдаа гарлаа");
      }
    } catch (error) {
      alert("Алдаа гарлаа");
    }
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1>Хөдөлгөөн</h1>
      </div>
      <Configure
        setIsProduct={setIsProduct}
        supplier={supplier}
        setSupplier={setSupplier}
        toAguulah={toAguulah}
        setToAguulah={setToAguulah}
        fromAguulah={fromAguulah}
        setFromAguulah={setFromAguulah}
        description={description}
        setDescription={setDescription}
      />
      <div
        style={{
          height: "95%",
          width: "100%",
          overflow: "scroll",
        }}
      >
        <ProductsHeader />
        <ProductList
          truncater={truncater}
          checkedProducts={checkedProducts}
          setCheckedProducts={setCheckedProducts}
          productData={productData}
          setProductdata={setProductdata}
          fromAguulah={fromAguulah}
        />
      </div>
      <div className={css.footer}>
        <Button onClick={closeHandler}>Цуцлах</Button>
        <Button onClick={movementFun}>Хадгалах</Button>
      </div>
      {isAddProduct && (
        <Modal
          width="max-content"
          height="80%"
          closeHandler={() => {
            setIsProduct(false);
          }}
        >
          <AddProduct
            supplier={supplier}
            setSupplier={setSupplier}
            checkedProducts={checkedProducts}
            setCheckedProducts={setCheckedProducts}
            setIsProduct={setIsProduct}
            truncater={truncater}
            fromAguulah={fromAguulah}
            toAguulah={toAguulah}
          />
        </Modal>
      )}
    </div>
  );
};

export default ChooseProducts;
