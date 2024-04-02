import React, { useContext, useEffect, useState } from "react";
import css from "./update.module.css";
import CollectionHook from "../../Hooks/CollectionHook";
import { Table } from "antd";

const Update = () => {
  const [product, setProduct] = useState([]);
  const [productIDS, setProductIDS] = useState([]);
  const [supplierIDS, setSupplierIDS] = useState([]);
  const [prod, setProd] = useState([]);
  const collctx = useContext(CollectionHook);

  const defaultColumns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "30%",
      editable: true,
    },
    {
      title: "Image",
      dataIndex: "image",
      width: "10%",
      render: (text, record) => {
        // console.log("record++++", record);
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={
                record.image
                  ? record.image
                  : "https://ebazaar.mn/media/product/27d2e8954f9d8cbf9d23f500ae466f1e24e823c7171f95a87da2f28ffd0e.jpg"
              }
              style={{
                width: "100px",
                height: "100px",
                objectFit: "contain",
              }}
            />
          </div>
        );
      },
    },
    {
      title: "Sku",
      dataIndex: "skus",
    },
    {
      title: "Barcode",
      dataIndex: "bar_code",
    },
    // {
    //   title: "Status",
    //   dataIndex: "operation",
    //   render: (_, record) =>
    //     products.length >= 1 ? (
    //       <Popconfirm
    //         title="Та устгахдаа итгэлтэй байна уу?"
    //         onConfirm={() => handleDelete(record.key)}
    //         okText="Тийм"
    //         cancelText="Үгүй"
    //       >
    //         <button className={css.deletebtn}>устгах</button>
    //       </Popconfirm>
    //     ) : null,
    // },
  ];
  var myHeaders = new Headers();
  myHeaders.append(
    "ebazaar_token",
    localStorage.getItem("ebazaar_admin_token")
  );
  myHeaders.append("Content-Type", "application/json");

  const cancelHandler = () => {
    collctx.setUpdate(false);
  };
  const confirmHandler = () => {};
  useEffect(() => {
    setProduct(collctx.updateProduct.name);
    setProductIDS(collctx.updateProduct.product_id);
    setSupplierIDS(collctx.updateProduct.supplier);
  }, []);
  useEffect(() => {
    // console.log("productids", productIDS);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    if (productIDS) {
      fetch(
        `https://api2.ebazaar.mn/api/products/get1?id=[${productIDS}]`,
        requestOptions
      )
        .then((r) => r.json())
        .then((res) => {
          // console.log("product++++", res.data);
          setProd(res.data);
        });
    } else {
      return;
    }
  }, [productIDS]);
  // console.log("collctx.updateProduct", collctx.updateProduct);
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div>
          <div className={css.inputcontainer}>
            <input
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />{" "}
            <button>Бараа сонгох</button>
          </div>
          <div className={css.tablecontainer}>
            <Table
              // components={components}
              pagination={false}
              bordered
              dataSource={prod}
              columns={defaultColumns}
              scroll={{ y: "100%" }}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
        <div className={css.buttonsContainer}>
          <button className={css.cancel} onClick={cancelHandler}>
            Цуцлах
          </button>

          <button className={css.confirm} onClick={confirmHandler}>
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;
