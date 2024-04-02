import React, { useState, useEffect, useContext } from "react";
import List from "./List";
import css from "./list.module.css";
import myHeaders from "../components/MyHeader/myHeader";
import { HeaderContext } from "../Hooks/HeaderHook";
import { HeaderContent } from "./HeaderContent";

const SpecialPermit = () => {
  const [data, setData] = useState();
  const [status, setStatus] = useState();
  const [prize, setPrize] = useState();
  const [tradeshop_id, setTradeshop_id] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [t_name, setT_name] = useState();

  const { setHeaderContent } = useContext(HeaderContext);

  useEffect(() => {
    setHeaderContent(<HeaderContent />);

    return () => {
      setHeaderContent(<></>);
    };
  }, []);

  const Fetchdata = () => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let url = `https://api2.ebazaar.mn/api/spinningwheel/get?tradeshop_id=${
      tradeshop_id || ""
    }&status=${status || ""}&prize=${prize || ""}&u_phone=${
      phoneNumber || ""
    }&t_name=${t_name || ""}`;

    fetch(url, requestOptions)
      .then((r) => r.json())
      .then((res) => {
        setData(res.result);
      })
      .catch((error) => {
        alert("Алдаа гарлаа");
      });
  };
  useEffect(() => {
    try {
      Fetchdata();
    } catch (error) {
      console.log("error", error);
    }
  }, [tradeshop_id, status, prize, phoneNumber, t_name]);

  // console.log(tradeshop_id, prize, status, prize);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "100%" }}>
        <div className="row header" style={{ padding: "0 12px" }}>
          <div style={{ width: "20%" }}>
            <div className={css.w700}>ID</div>
          </div>
          <div style={{ width: "40%" }}>
            <div className={css.w700}>Огноо</div>
          </div>
          <div style={{ width: "50%" }}>
            <div className={css.w700}>UserID</div>
          </div>
          <div style={{ width: "50%" }}>
            <div className={css.w700}>TradeshopID</div>
            <div>
              <input
                type="text"
                placeholder="Хайх ..."
                style={{ padding: "8px" }}
                onChange={(e) => setTradeshop_id(e.target.value)}
              />
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <div className={css.w700}>TradeshopName</div>
            <div>
              <input
                type="text"
                placeholder="Хайх ..."
                style={{ padding: "8px" }}
                onChange={(e) => setT_name(e.target.value)}
              />
            </div>
          </div>
          <div style={{ width: "50%" }}>
            <div className={css.w700}>Утас</div>
            <div>
              <input
                type="text"
                placeholder="Хайх ..."
                style={{ padding: "8px" }}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <div style={{ width: "50%" }}>
            <div className={css.w700}>Захиалгын үнийн дүн</div>
          </div>
          <div style={{ width: "50%" }}>
            <div className={css.w700}>Захиалгын дугаар</div>
          </div>
          <div style={{ width: "150%" }}>
            <div className={css.w700}>Хаяг</div>
          </div>
          <div style={{ width: "50%" }}>
            <div className={css.w700}>Статус</div>
            <div>
              <select
                name="supplier"
                id="supplier"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option value={""}>---</option>
                <option value={1}>Ашиглаагүй</option>
                <option value={2}>Ашигласан</option>
              </select>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <div className={css.w700}>Prize</div>
            <div>
              <select
                name="supplier"
                id="supplier"
                onChange={(e) => {
                  setPrize(e.target.value);
                }}
              >
                {/* <option value={""}>---</option>
								<option value={1}>Тэмдэглэлийн дэвтэр</option>
								<option value={3}>Малгай</option>
								<option value={5}>Поло</option>
								<option value={6}>Хөзөр</option>
								<option value={8}>Sengur Үүргэвч</option>
								<option value={10}>Tiger Үүргэвч</option>
								<option value={"2,4,7,9"}>Хоосон</option> */}
                <option value={""}>---</option>
                <option value="Mouse Pad">Mouse Pad</option>
                <option value="Тэмдэглэлийн дэвтэр">Тэмдэглэлийн дэвтэр</option>
                <option value="Heineken сагс">Heineken сагс</option>
                <option value="Баярлалаа">Баярлалаа</option>
                <option value="Поло">Поло</option>
                <option value="Малгай">Малгай</option>
                <option value="Хөзөр">Хөзөр</option>
                <option value="Tiger Үүргэвч">Tiger Үүргэвч</option>
              </select>
            </div>
          </div>
        </div>
        <List data={data} />
      </div>
    </div>
  );
};

export default SpecialPermit;
