import React, { useState, useEffect, useContext } from "react";
import List from "./List";
import css from "./list.module.css";
import { styles } from "./style";
import { HeaderContext } from "../Hooks/HeaderHook";
import { HeaderContent } from "./HeaderContent";

const SpecialPermit = () => {
  const [data, setData] = useState();
  const [couponData, setCouponData] = useState();
  const [tradeshopID, setTradeshopID] = useState();
  const [tradeshopName, setTradeshopName] = useState();
  const [phone, setPhone] = useState();
  const [orderId, setOrderId] = useState();
  const [amount, setAmount] = useState();
  const [target, setTarget] = useState();
  const [reward, setReward] = useState();
  const [isUsed, setIsUsed] = useState();

  const { setHeaderContent } = useContext(HeaderContext);

  useEffect(() => {
    setHeaderContent(<HeaderContent />);

    return () => {
      setHeaderContent(<></>);
    };
  }, []);

  const Fetchdata = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    let controller = new AbortController();
    var myHeaders = new Headers();
    myHeaders.append(
      "ebazaar_token",
      localStorage.getItem("ebazaar_admin_token")
    );
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      signal: controller.signal,
    };

    // let url = `https://api2.ebazaar.mn/api/marathons/get?end_date=${today}&start_date=2022-12-01`;
    let url = `https://api2.ebazaar.mn/api/marathons/get?end_date=2022-12-31&start_date=2022-12-01`;

    fetch(url, requestOptions)
      .then((r) => r.json())
      .then((res) => {
        // console.log("array marahton ", res.data);
        setData(res.data);
        controller = null;
      })
      .catch((error) => {
        alert("Алдаа гарлаа");
      });
    return () => controller?.abort();
  };
  const FetchCoupondata = () => {
    let controller = new AbortController();
    var myHeaders = new Headers();
    myHeaders.append(
      "ebazaar_token",
      localStorage.getItem("ebazaar_admin_token")
    );
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      signal: controller.signal,
    };

    let url = `https://api2.ebazaar.mn/api/coupon/get`;

    fetch(url, requestOptions)
      .then((r) => r.json())
      .then((res) => {
        setCouponData(res.data);
        controller = null;
      })
      .catch((error) => {
        alert("Алдаа гарлаа");
      });
    return () => controller?.abort();
  };
  useEffect(() => {
    try {
      Fetchdata();
      FetchCoupondata();
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  useEffect(() => {
    if (data && couponData) {
      data?.map(
        (e) =>
          (e.isUsed =
            couponData?.find((q) => q.TradeshopID === e.tradeshop_id)?.isUsed ||
            0)
      );
    }
  }, [couponData, data]);

  let filteredData = tradeshopID
    ? data?.filter((a) => a.tradeshop_id === parseInt(tradeshopID))
    : tradeshopName
    ? data?.filter((a) => a.tradeshop_name === tradeshopName)
    : phone
    ? data?.filter((a) => a.user_number === parseInt(phone))
    : amount
    ? data?.filter((a) => a.amount === parseInt(amount))
    : target
    ? data?.filter((a) => a.target === parseInt(target))
    : reward
    ? data?.filter((a) => a.reward === parseInt(reward))
    : isUsed
    ? data?.filter((a) => a.isUsed === parseInt(isUsed))
    : data;

  return (
    <div
      style={{
        display: "flex",
        width: "auto",
        overflowX: "scroll",
        overflowY: "hidden",
        height: "94.5vh",
      }}
    >
      <div style={{ width: "2030px" }}>
        <div className="row header" style={{ padding: "0 0px" }}>
          <div style={{ ...styles.checkboxcontainer }}>
            <div className={css.w700}>TradeshopID</div>
            <div>
              <input
                type="text"
                placeholder="Хайх ..."
                style={{ padding: "8px" }}
                onChange={(e) => setTradeshopID(e.target.value)}
              />
            </div>
          </div>
          <div style={{ ...styles.supplierContainer }}>
            <div className={css.w700}>TradeshopName</div>
            <div>
              <input
                type="text"
                placeholder="Хайх ..."
                style={{ padding: "8px" }}
                onChange={(e) => setTradeshopName(e.target.value)}
              />
            </div>
          </div>
          <div style={{ ...styles.sugalaaContainer }}>
            <div className={css.w700}>user_phone_number</div>
            <div>
              <input
                type="text"
                placeholder="Хайх ..."
                style={{ padding: "8px" }}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div style={{ ...styles.orderNumberContainer }}>
            <div className={css.w700}>Захиалгын дугаар</div>
            <div>
              <input
                type="text"
                placeholder="Хайх ..."
                style={{ padding: "8px" }}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
          </div>
          <div style={{ ...styles.dunContainer }}>
            <div className={css.w700}>Дүн</div>
            <div>
              <input
                type="text"
                placeholder="Хайх ..."
                style={{ padding: "8px" }}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <div style={{ ...styles.targetContainer }}>
            <div className={css.w700}>Target</div>
            <div>
              <input
                type="text"
                placeholder="Хайх ..."
                style={{ padding: "8px" }}
                onChange={(e) => setTarget(e.target.value)}
              />
            </div>
          </div>
          <div style={{ ...styles.percentContainer }}>
            <div className={css.w700}>Хувь</div>
            <div>
              <input
                type="text"
                placeholder="Хайх ..."
                style={{ padding: "8px" }}
                onChange={(e) => setTarget(e.target.value)}
              />
            </div>
          </div>
          <div style={{ ...styles.rewardContainer }}>
            <div className={css.w700}>Reward</div>
            <div>
              <input
                type="text"
                placeholder="Хайх ..."
                style={{ padding: "8px" }}
                onChange={(e) => setReward(e.target.value)}
              />
            </div>
          </div>
          <div style={{ ...styles.isUsedContainer }}>
            <div className={css.w700}>Is Used</div>
            <div>
              <select
                // name="supplier"
                // id="supplier"
                onChange={(e) => {
                  setIsUsed(e.target.value);
                }}
              >
                <option value={""}>---</option>
                <option value={1}>Ашигласан</option>
                <option value={0}>Ашиглаагүй</option>
              </select>
            </div>
          </div>
          <div style={{ ...styles.createCouponContainer }}>
            <div className={css.w700}>Coupon олгох</div>
            <div>
              <input
                type="text"
                placeholder="Хайх ..."
                style={{ padding: "8px" }}
                onChange={(e) => setReward(e.target.value)}
              />
            </div>
          </div>
        </div>
        <List data={filteredData} />
      </div>
    </div>
  );
};

export default SpecialPermit;
