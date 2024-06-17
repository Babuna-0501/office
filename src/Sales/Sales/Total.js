import React, { useState, useEffect } from "react";
import myHeaders from "../../components/MyHeader/myHeader";

const Total = (props) => {
  const [posApi, setPosApi] = useState(null);

  useEffect(() => {
    const fetchPos = async () => {
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "https://api2.ebazaar.mn/pos-api/info",
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        setPosApi(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchPos();
  }, []);

  let totalSalesAmount = 0;
  let salesNumber = 0;
  props.data.forEach((sale) => {
    if (sale.type === 2 && sale.documentId === "Кассын борлуулалт") {
      sale.products.forEach((product) => {
        if (product.sellPrice && product.sellPrice.retail && product.quantity) {
          totalSalesAmount +=
            Number(product.quantity) * Number(product.sellPrice.retail);
        }
      });
      salesNumber++;
    }
  });

  return (
    <div id="total">
      <div className="total_block">
        <h4>Борлуулалтын дүн</h4>
        <h5>{totalSalesAmount.toLocaleString()}₮</h5>
      </div>
      <div className="total_block">
        <h4>Борлуулалтын тоо</h4>
        <h5>{salesNumber}</h5>
      </div>
      <div className="total_block">
        <h4>Сугалааны Үлдэгдэл</h4>
        <h5>{posApi ? posApi.data.leftLotteries : "-"}</h5>
      </div>
	  <div className="total_block">
        <h4>Сүүлд илгээсэн огноо</h4>
        <h5>{posApi ? posApi.data.lastSentDate : "-"}</h5>
      </div>
    </div>
  );
};

export default Total;
