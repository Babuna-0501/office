import React, { useState, useEffect } from "react";
import "./footer.css";

const Total = (props) => {
  const [totalPrice, setTotalPrice] = useState(null);
  //Нөөцгүй
  const [zeroStockCount, setZeroStockCount] = useState(0);
  //Татан авалт хийх
  const [lowStockCount, setLowStockCount] = useState(0);


  useEffect(() => {
    if (props.data && props.data.length > 0) {
      // Нийт мөнгөн дүн
      let totalGrandTotal = props.data.reduce(
        (acc, curr) => acc + curr.stock,
        0
      );
      console.log(props.data);
      setTotalPrice(totalGrandTotal);
      
      // Нөөцгүй бүтээгдэхүүнүүдийн тоо
      let zeroStock = props.data.filter(product => product.stock === 0).length;
      setZeroStockCount(zeroStock);


      // Бага нөөцтэй бүтээгдэхүүнүүдийн тоо (0-20)
      let lowStock = props.data.filter(product => product.stock > 0 && product.stock <= 20).length;
      setLowStockCount(lowStock);
    }
  }, [props.data]);

  let aaa = totalPrice?.toLocaleString();


  return (
    <div className="container-2">
      <div>
        <div style={{ fontSize: "12px", fontWeight: "bold" }}>
          Нийт бүтээгдэхүүний хуудас :{" "}
          {Math.ceil((props.data?.length ?? 0) / 100)}
        </div>
      </div>
      <div className="wrapper">
        <div className="footerspan">Идэвхтэй: </div>
        <span className="footerspantww">{props.data?.length ?? 0}ш</span>
      </div>
      <div className="wrapper">
        <div className="footerspan">Нөөцгүй :</div>
        <span className="footerspantww">{zeroStockCount}</span>
      </div>
      <div className="wrapper">
        <div className="footerspan">Таталт хийх  :</div>
        <span className="footerspantww">{lowStockCount}</span>
      </div>
    </div>
  );
};


export default Total;
