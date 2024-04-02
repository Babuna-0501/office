import React from "react";
import { useEffect } from "react";
import css from "./list2.module.css";
import SideMenu from "../components/common/SideMenu/index";
import { useState } from "react";
import { SidebarContent } from "./sidebarContent";
import myHeaders from "../components/MyHeader/myHeader";
import InfiniteScroll from "react-infinite-scroll-component";

const ListProduct2 = (props) => {
  const [isSideMenu, setIsSideMenu] = useState(false);
  const [product, setProduct] = useState({});
  const [movementArr, setMovementArr] = useState([]);
  const [page, setPage] = useState(1);

  const getMovement = async () => {
    const baseUrl = "https://api2.ebazaar.mn/api/warehouse/get/new";
    const queryParams = new URLSearchParams({
      productId: product._id,
      id: props?.warehouseId,
      movementPage: page,
      movementLimit: 15,
      productMovement: true,
    });

    const url = `${baseUrl}?${queryParams}`;
    console.log(url)
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    console.log(requestOptions)

    try {


      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const res = await response.json();
      const data = res.data;
      setMovementArr([...movementArr, ...data[0]?.movement]);
    } catch (error) {
      //console.error("Error:", error);
    }
  };

  useEffect(() => {
    getMovement();
  }, [page, product._id]);


  return (
    <div id="scrollableDiv" className={css.container}>
      <InfiniteScroll
        dataLength={props?.products.length}
        hasMore={true}
        next={() => props.setPage((prev) => prev + 1)}
        // loader={
        //   <p style={{ textAlign: "center" }}>
        //     <b>Уншиж байна...</b>
        //   </p>
        // }
        scrollableTarget="scrollableDiv"
      >
        {props.products.map((product, index) => (
          <div className={css.rowContainer} key={index}>
            <div style={{ width: "50px" }}>
              <input type="checkbox" />
            </div>
            <div>
              <span>{product._id}</span>
            </div>
            <div style={{ width: "100px" }}>
              {0 === 0 ? (
                <img src="https://admin.ebazaar.mn/media/on.svg" alt="on" />
              ) : (
                <img src="https://admin.ebazaar.mn/media/off.svg" alt="off" />
              )}
            </div>
            <div className={css.imageWrapper}>
              <img src={product.image[0]} alt="image" />
            </div>
            <div
              style={{
                width: "200px",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <span>{product.name}</span>
            </div>
            <div>
              <span>
                {
                  props.categories.find((c) => c?.id === product?.category_id)
                    ?.name
                }
              </span>
            </div>
            <div style={{ width: "100px" }}>
              <span>---</span>
            </div>
            <div style={{ width: "140px" }}>
              <span>{product.sku}</span>
            </div>
            <div style={{ width: "140px" }}>
              <span>{product.bar_code}</span>
            </div>
            <div style={{ width: "140px" }}>
              <span>{product.stock}</span>
            </div>
            <div style={{ width: "140px" }}>
              <button
                style={{
                  width: "90%",
                  borderRadius: "5px",
                  border: "none",
                  textAlign: "center",
                  color: "#FFFFFF",
                  background: "#B0BEC5",
                  fontSize: "12px",
                }}
              >
                Татан авах
              </button>
            </div>
            <div style={{ width: "140px" }}>
              <button
                onClick={() => {
                  setMovementArr([]);
                  setProduct(product);
                  getMovement({ product });
                  setIsSideMenu((prev) => !prev);
                  setPage(1);
                }}
                style={{
                  width: "90%",
                  borderRadius: "5px",
                  border: "none",
                  textAlign: "center",
                  color: "#546E7A",
                  background: "#ECEFF1",
                  border: "1px solid #CFD8DC",
                  fontSize: "12px",
                }}
              >
                Хөдөлгөөн
              </button>
            </div>
          </div>
        ))}
      </InfiniteScroll>

      {isSideMenu ? (
        <SideMenu setIsSideMenu={setIsSideMenu} style={{}}>
          <SidebarContent
            product={product}
            movementArr={movementArr}
            setPage={setPage}
            page={page}
          />
        </SideMenu>
      ) : null}
    </div>
  );
};

export default ListProduct2;
