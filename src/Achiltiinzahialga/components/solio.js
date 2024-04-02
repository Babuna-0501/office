import React, { useEffect, useState } from "react";
import css from "./solio.module.css";
import { Button } from "../../components/common";
import myHeaders from "../../components/MyHeader/myHeader";
import AddProduct from "./chooseProducts/addProduct";
import { Modal } from "./common";

const Solio = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [chosenWareouse, setChosenWarehouse] = useState("");
  const [isAddProduct, setIsProduct] = useState(false);
  const [checkedProducts1, setCheckedProducts1] = useState([]);
  const [checkedProducts2, setCheckedProducts2] = useState([]);
  const [isAguulah, setIsAguulah] = useState(false);

  const truncater = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength - 3) + "...";
    } else {
      return text;
    }
  };

  const getWarehouses = async () => {
    try {
      const url = `https://api2.ebazaar.mn/api/warehouse/get/new`;
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const res = await fetch(url, requestOptions);
      const resData = await res.json();

      setWarehouses(resData.data);
    } catch (error) {
      console.log("error while fetching users: ", error);
    }
  };
  useEffect(() => {
    getWarehouses();
  }, []);

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.left}>
          <select
            onChange={(e) => {
              setChosenWarehouse(e.target.value);
            }}
          >
            <option value="">Агуулах</option>
            {warehouses.map((warehouse) => {
              return <option value={warehouse?._id}>{warehouse?.name}</option>;
            })}
          </select>
          <select>
            <option>Нийлүүлэгч</option>
            <option value="1">A Нийлүүлэгч</option>
            <option value="2">B Нийлүүлэгч</option>
          </select>
        </div>
        <div className={css.right}>
          <Button
            style={{ padding: "5px 10px", fontSize: "14px" }}
            onClick={() => {
              if (chosenWareouse === "") {
                alert("Агуулах эсвэл Нийлүүлэгч сонгоно уу!");
              } else {
                setIsProduct(true);
                setIsAguulah(true);
              }
            }}
          >
            Бараа сонгох1
          </Button>
          <Button
            style={{ padding: "5px 10px", fontSize: "14px" }}
            onClick={() => {
              if (chosenWareouse === "") {
                alert("Агуулах эсвэл Нийлүүлэгч сонгоно уу!");
              } else {
                setIsProduct(true);
                setIsAguulah(false);
              }
            }}
          >
            Бараа сонгох2
          </Button>
        </div>
      </div>
      <div className={css.body}>
        <div className={css.top}>
          <div className={css.productsHeader}>
            <div className={css.field}>
              <span>Барааны код</span>
            </div>
            <div className={css.field}>
              <span>Барааны нэр</span>
            </div>
            <div className={css.field}>
              <span>Серийн №</span>
            </div>
            <div className={css.field}>
              <span>Хэлбэр</span>
            </div>
            <div className={css.field}>
              <span>Бодит савлалт</span>
            </div>
            <div className={css.field}>
              <span>Зардаг савлалт</span>
            </div>
            <div className={css.field}>
              <span>Тоо хэмжээ</span>
            </div>
            <div className={css.field}>
              <span>Ширхэгийн үнэ</span>
            </div>
            <div className={css.field}>
              <span>Дүн</span>
            </div>
            <div className={css.field}>
              <span>Хямдрал %</span>
            </div>
            <div className={css.field}>
              <span>Хямдарсан дүн</span>
            </div>
            <div className={css.field}>
              <span>Төлөх дүн</span>
            </div>
            <div className={css.field}>
              <span>Зарах үнэ</span>
            </div>
          </div>
          <div className={css.productsContainer}>
            {checkedProducts1.map((product) => {
              return (
                <div className={css.product}>
                  <div className={css.field}>
                    <span>{product?._id}</span>
                  </div>
                  <div className={css.field}>
                    <span>{product?.name}</span>
                  </div>
                  <div className={css.field}>
                    <span>seriesNumberdsfsdf</span>
                  </div>
                  <div className={css.field}>
                    <span>Үрэл</span>
                  </div>
                  <div className={css.field}>
                    <span>20</span>
                  </div>
                  <div className={css.field}>
                    <span>20</span>
                  </div>
                  <div className={css.field}>
                    <input />
                  </div>
                  <div className={css.field}>
                    <span>1500</span>
                  </div>
                  <div className={css.field}>
                    <span>150000</span>
                  </div>
                  <div className={css.field}>
                    <span>10%</span>
                  </div>
                  <div className={css.field}>
                    <span>15000</span>
                  </div>
                  <div className={css.field}>
                    <span>135000</span>
                  </div>
                  <div className={css.field}>
                    <span>2000</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={css.top}>
          <div className={css.productsHeader}>
            <div className={css.field}>
              <span>Барааны код</span>
            </div>
            <div className={css.field}>
              <span>Барааны нэр</span>
            </div>
            <div className={css.field}>
              <span>Серийн №</span>
            </div>
            <div className={css.field}>
              <span>Хэлбэр</span>
            </div>
            <div className={css.field}>
              <span>Бодит савлалт</span>
            </div>
            <div className={css.field}>
              <span>Зардаг савлалт</span>
            </div>
            <div className={css.field}>
              <span>Тоо хэмжээ</span>
            </div>
            <div className={css.field}>
              <span>Ширхэгийн үнэ</span>
            </div>
            <div className={css.field}>
              <span>Дүн</span>
            </div>
            <div className={css.field}>
              <span>Хямдрал %</span>
            </div>
            <div className={css.field}>
              <span>Хямдарсан дүн</span>
            </div>
            <div className={css.field}>
              <span>Төлөх дүн</span>
            </div>
            <div className={css.field}>
              <span>Зарах үнэ</span>
            </div>
          </div>
          <div className={css.productsContainer}>
            {checkedProducts2.map((product) => {
              return (
                <div className={css.product}>
                  <div className={css.field}>
                    <span>{product?._id}</span>
                  </div>
                  <div className={css.field}>
                    <span>{product?.name}</span>
                  </div>
                  <div className={css.field}>
                    <span>1234йыб5</span>
                  </div>
                  <div className={css.field}>
                    <span>Үрэл</span>
                  </div>
                  <div className={css.field}>
                    <span>20</span>
                  </div>
                  <div className={css.field}>
                    <span>20</span>
                  </div>
                  <div className={css.field}>
                    <input />
                  </div>
                  <div className={css.field}>
                    <span>1500</span>
                  </div>
                  <div className={css.field}>
                    <span>150000</span>
                  </div>
                  <div className={css.field}>
                    <span>10%</span>
                  </div>
                  <div className={css.field}>
                    <span>15000</span>
                  </div>
                  <div className={css.field}>
                    <span>135000</span>
                  </div>
                  <div className={css.field}>
                    <span>2000</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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
            supplier=""
            checkedProducts={isAguulah ? checkedProducts1 : checkedProducts2}
            setCheckedProducts={
              isAguulah ? setCheckedProducts1 : setCheckedProducts2
            }
            setIsProduct={setIsProduct}
            truncater={truncater}
            fromAguulah={chosenWareouse}
            toAguulah=""
          />
        </Modal>
      )}
    </div>
  );
};

export default Solio;
