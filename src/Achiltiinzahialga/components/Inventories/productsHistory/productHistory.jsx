import React from "react";
import ChosenProduct from "./chosenProduct/chosenProduct";
import Movement from "./movement/movement";
import css from "./productsHistory.module.css";
import { useEffect } from "react";
import myHeaders from "../../../../components/MyHeader/myHeader";
import { useState } from "react";
import { Button } from "../../common";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "./movement/header";

const ProductHistory = (props) => {
  const { productData, inventory, setActiveTab } = props;
  const [page, setPage] = useState(1);
  const [movement, setMovement] = useState([]);
  const [movementArr, setMovementArr] = useState([]);
  const [movementType, setMovementType] = useState("");

  useEffect(() => {
    setPage(1);
  }, [movementType]);

  const getMovement = async () => {
    try {
      const url = `https://api2.ebazaar.mn/api/warehouse/get/new?productId=${productData?._id}&id=${inventory?._id}&movementType=${movementType}&movementLimit=15&movementPage=${page}&productMovement=true`;
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const res = await fetch(url, requestOptions);
      console.log(res)
      const resData = await res.json();
      console.log("resData.data[0].movement", resData);

      if (page !== 1) {
        setMovement([...movementArr, ...resData.data[0].movement]);
      } else {
        console.log(resData.data.movement)
        setMovement(resData.data.movement);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (productData !== null) {
      getMovement();
    } else {
      alert("Бараа сонгоно уу");
      setActiveTab(1);
    }
  }, [productData, movementType, page]);

  useEffect(() => {
    setMovementArr(movement);
  }, [movement]);

  return (
    <div className={css.container}>
      {productData !== null ? (
        <>
          <ChosenProduct productData={productData} />
          <div className={css.buttons}>
            <Button
              onClick={() => {
                setMovementType("");
              }}
            >
              Бүгд
            </Button>
            <Button
              onClick={() => {
                setMovementType(1);
              }}
            >
              Орсон
            </Button>
            <Button
              onClick={() => {
                setMovementType(2);
              }}
            >
              Гарсан
            </Button>
          </div>
          <Header />
          <div id="movementList" className={css.movementList}>
            <InfiniteScroll
              scrollableTarget="movementList"
              dataLength={movementArr.length}
              hasMore={true}
              next={() => {
                setPage(page + 1);
              }}
              loader={<p style={{ textAlign: "center" }}></p>}
            >
              {movementArr.length !== 0 ? (
                movementArr.map((movementData) => (
                  <Movement movementData={movementData} />
                ))
              ) : (
                <div>Хоосон</div>
              )}
            </InfiniteScroll>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductHistory;
