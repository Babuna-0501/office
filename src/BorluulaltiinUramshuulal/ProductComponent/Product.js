import React, { useState, useContext, useRef, useEffect } from "react";
import { styles } from "./style";
import checkbox from "../../assets/check box.svg";
import checked from "../../assets/Tick Square_green.svg";
import css from "./product.module.css";
import tugrugnogoon from "../../assets/tugrug.svg";
import tugrugsaaral from "../../assets/tugrug@2x.svg";
import SMSHook from "../../Hooks/SMSHook";
import TargetComp from "./TargetComp";
import deleteIcon from "../../assets/delete_red_small.svg";


const Product = (props) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const smsctx = useContext(SMSHook);

  const moneyRef = useRef();
  const quantityRef = useRef();
  // console.log("goalProduct", props.item._id);
  // console.log("goalProduct", smsctx.updateID.products);

  let goal = {};
  let succedd = {};
  let waiting = {};

  smsctx.updateID &&
    smsctx.updateID.products &&
    smsctx.updateID.products.map((x) => {
      if (x.productId === props.item._id) {
        goal = {
          ...x.goal,
        };
        succedd = {
          ...x.succeeded,
        };
        waiting = {
          ...x.waiting,
        };
      }
    });

  useEffect(() => {
    if (smsctx.updateID) {
      smsctx.updateID.products?.map((x) => {
        if (x.productId === props.item._id) {
          setTotalAmount(x.goal.amount);
          setTotalQuantity(x.goal.quantity);
        }
      });
    }
  }, [smsctx.updateID]);
  const DeleteHandler = () => {
    let products = [...props.data];
    products = products.filter((product) => product._id !== props.item._id);
    props.setData([...products]);
    let aa = smsctx.chosedProdIDS.filter((x) => x !== props.item._id);
    smsctx.setChosedProdIDS(aa);
  };
  console.log("props.data", props.data);
  return (
    <div className={css.oneproduct}>
      <div
        className={css.onesup}
        style={{
          ...styles.imageContainer,
        }}
      >
        <img
          src={
            props.item && props.item.image
              ? props.item.image[0]?.replace("original", "product")
              : "https://ebazaar.mn/media/product/69883d9becbcf663f7f3da1b874eab762cf6581c3ee1d3e81098e6f14aae.jpg"
          }
        />
      </div>
      <div
        className={css.onesup}
        style={{
          ...styles.productContainer,
        }}
      >
        <span>{props.item && props.item.name && props.item.name}</span>
      </div>
      <div
        className={css.onesup}
        style={{
          ...styles.angilalContainer,
        }}
      >
        <span>{props.item && props.catname && props.catname.name}</span>
      </div>
      <div
        className={css.onesup}
        style={{
          ...styles.brandContainer,
        }}
      >
        <span>
          {props.item && props.brandname && props.brandname.BrandName}
        </span>
      </div>

      <div
        className={css.onesup}
        style={{
          ...styles.skuContainer,
        }}
      >
        <span>{props.item && props.item.sku && props.item.sku}</span>
      </div>
      <div
        className={css.onesup}
        style={{
          ...styles.barcodeContainer,
        }}
      >
        <span>{props.item && props.item.bar_code && props.item.bar_code}</span>
      </div>
      <div
        className={`${css.onesup} ${css.position} ${
          props.data.find((x) => x._id === props.item._id).totalQuantity !== 0
            ? css.disabeldiv
            : null
        }`}
        style={{
          ...styles.barcodeContainer,
        }}
      >
        <input
          ref={moneyRef}
          value={totalAmount}
          onChange={(e) => {
            let aa = [...props.data];
            aa.find((x) => x._id === props.item._id).totalAmount = Number(
              e.target.value
            );
            props.setData(aa);
            setTotalAmount(e.target.value);
          }}
          //   placeholder="0"
          min={0}
          type="number"
          style={{
            background: totalAmount !== null ? "#F9FCF5" : "#fff",
            border:
              totalAmount !== null
                ? "0.8px solid #60A744"
                : "0.8px solid #CCCCCC",
          }}
        />
        <img
          src={totalAmount !== null ? tugrugnogoon : tugrugsaaral}
          alt="Tugrug icon"
        />
      </div>
      <div
        className={`${css.onesup} ${
          props.data.find((x) => x._id === props.item._id).totalAmount !== 0
            ? css.disabeldiv
            : null
        }`}
        style={{
          ...styles.barcodeContainer,
        }}
      >
        <input
          ref={quantityRef}
          type="number"
          min={0}
          value={totalQuantity}
          onChange={(e) => {
            let aa = [...props.data];
            aa.find((x) => x._id === props.item._id).totalQuantity = Number(
              e.target.value
            );
            props.setData(aa);
            setTotalQuantity(e.target.value);
          }}
          style={{
            background: totalQuantity !== null ? "#F9FCF5" : "#fff",
            border:
              totalQuantity !== null
                ? "0.8px solid #60A744"
                : "0.8px solid #CCCCCC",
          }}
        />
      </div>

      <div
        className={css.bar}
        style={{
          display: smsctx.barOpen ? "block" : "none",
        }}
      >
        <div
          style={{
            fontSize: "10px",
            color: "#1A1A1A",
            fontWeight: "600",
          }}
        >
          {goal.amount === 0
            ? `${goal.quantity?.toLocaleString()}ш`
            : `${goal.amount?.toLocaleString()}₮`}
        </div>
        {/* <span>}</span> */}
        <div className={css.secondbar}>
          <p
            style={{
              zIndex: 20,
            }}
          ></p>
          <p
            style={{
              zIndex: 21,
              width: `${
                waiting.amount === 0
                  ? `${
                      ((waiting.quantity + succedd.quantity) * goal.quantity) /
                      120
                    }px`
                  : `${
                      ((waiting.amount + succedd.amount) * goal.amount) / 120
                    }px`
              }`,
              background: "#D6DF2A",
            }}
          ></p>
          <p
            style={{
              zIndex: 22,
              width: `${
                succedd.amount === 0
                  ? `${(succedd.quantity * goal.quantity) / 120}px`
                  : `${(succedd.amount * goal.amount) / 120}px`
              }`,
              background: "#2AB674",
            }}
          ></p>
        </div>
      </div>
      <div>
        <img src={deleteIcon} onClick={DeleteHandler} />
      </div>
    </div>
  );
};

export default Product;
