import { useEffect } from "react";
import css from "./sidebar.module.css";
import { useState } from "react";

export const SideBar = (props) => {
  const { maxOrderProduct, minOrderProduct, backOffUsers } = props;
  // console.log("maxOrderProduct", maxOrderProduct);
  // console.log("minOrderProduct", minOrderProduct);

  const [minData, setMinData] = useState([]);
  const [maxData, setMaxData] = useState([]);

  const [maxMerName, setMaxMerName] = useState();
  const [minMerName, setMinMerName] = useState();

  useEffect(() => {
    setMaxData(maxOrderProduct);
    setMinData(minOrderProduct);
  }, [minOrderProduct, maxOrderProduct]);

  useEffect(() => {
    if (backOffUsers.length > 0 && maxOrderProduct.length > 0 && minOrderProduct.length > 0) {
      const filteredMax = backOffUsers.filter(
        (user) => user.user_id === Number(maxOrderProduct[0].backOffId)
      );
      const filteredMin = backOffUsers.filter(
        (user) => user.user_id === Number(minOrderProduct[0].backOffId)
      );
      if (filteredMax.length > 0) {
        setMaxMerName(filteredMax[0].first_name);
      }
      if (filteredMin.length > 0) {
        setMinMerName(filteredMin[0].first_name);
      }
    }
  }, [backOffUsers, maxOrderProduct, minOrderProduct]);

  return minData.length > 1 && maxData.length > 1 ? (
    <div className={css.container}>
      <div className={`${css.textContainer}`} style={{ borderLeft: "3px solid #32ce9a" }}>
        <div className={`${css.titleGood}`}>Merchant name</div>
        <div className={`${css.text}`}>{maxMerName ? maxMerName : "..."}</div>
      </div>

      <div className={`${css.textContainer}`} style={{ borderLeft: "3px solid #32ce9a" }}>
        <div className={`${css.titleGood}`}>Brand ID</div>
        <div className={`${css.text}`}>{maxData[1].product_brand_id}</div>
      </div>

      <div className={`${css.textContainer}`} style={{ borderLeft: "3px solid #32ce9a" }}>
        <div className={`${css.titleGood}`}>Product name</div>
        <div className={`${css.text}`}>{maxData[1].product_name}</div>
      </div>

      <div className={`${css.textContainer}`} style={{ borderLeft: "3px solid #32ce9a" }}>
        <div className={`${css.titleGood}`}>Branch</div>
        <div className={`${css.text}`}>{maxData[0].tradeName}</div>
      </div>

      <div className={`${css.textContainer}`} style={{ borderLeft: "3px solid #32ce9a" }}>
        <div className={`${css.titleGood}`}>Date</div>
        <div className={`${css.text}`}>{maxData[0].date.substring(0, 10)}</div>
      </div>

      <div className={`${css.textContainer}`} style={{ borderLeft: "3px solid #f76433" }}>
        <div className={`${css.titleBad}`}>Merchant name</div>
        <div className={`${css.text}`}>{minMerName ? minMerName : "..."}</div>
      </div>

      <div className={`${css.textContainer}`} style={{ borderLeft: "3px solid #f76433" }}>
        <div className={`${css.titleBad}`}>Brand ID</div>
        <div className={`${css.text}`}>{minData[1].product_brand_id}</div>
      </div>

      <div className={`${css.textContainer}`} style={{ borderLeft: "3px solid #f76433" }}>
        <div className={`${css.titleBad}`}>Product name</div>
        <div className={`${css.text}`}>{minData[1].product_name}</div>
      </div>

      <div className={`${css.textContainer}`} style={{ borderLeft: "3px solid #f76433" }}>
        <div className={`${css.titleBad}`}>Branch</div>
        <div className={`${css.text}`}>{minData[0].tradeName}</div>
      </div>

      <div className={`${css.textContainer}`} style={{ borderLeft: "3px solid #f76433" }}>
        <div className={`${css.titleBad}`}>Date</div>
        <div className={`${css.text}`}>{minData[0].date.substring(0, 10)}</div>
      </div>
    </div>
  ) : (
    <div className={css.container}>...</div>
  );
};
