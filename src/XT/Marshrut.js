import React, { useState, useContext, useEffect } from "react";
import css from "./marshrut.module.css";
import Onext from "./Onext";
import { styles } from "./style";
import XTHook from "../Hooks/XtHook";
import Calendar from "./components/Calendar/Calendar";
import Shops from "./Shops";
import XTcalendar from "./XTcalendar";
import Warehouse from "./Warehouse";
import Zone from "./Zone";
import ShopIndex from "./components/Shops/ShopIndex";
const Marshrut = ({
  data,
  onClick,
  index,
  setActive,
  listdata,
  onextdata,
  inventorydata,
  worksdata,
  setWorksdata,
  roleman,
}) => {
  // console.log("data", data);

  const [shopopen, setShopopen] = useState(false);
  const [dayopen, setDayopen] = useState(false);

  const [aguulahOpen, setAguulahOpen] = useState(false);
  const [dayData, setDayData] = useState([]);
  const [inventoryselect, setInventoryselect] = useState([]);
  const [selectvalue, setSelectvalue] = useState(null);
  const [zoneOpen, setZoneOpen] = useState(false);
  const [shosedOpen, setChosedOpen] = useState(false);

  const XTctx = useContext(XTHook);
  const hubiarlasan = (item) => {
    setActive(true);
    XTctx.setHi(true);
    XTctx.setPage(1);
    onClick(index, data);
  };
  const Shophubiarlasan = (item) => {
    setShopopen(true);
  };
  const Dayhubiarlasan = (item) => {
    setDayData(item);
    setDayopen(true);
  };

  useEffect(() => {
    // console.log("data.inventory", data);
    // console.log("inventorydata", inventorydata);
    let aa = [];
    if (data.inventory !== null) {
      let ab = [];

      if (data.inventory.includes(",")) {
        ab = data.inventory.split(",");
      } else if (data.inventory.length !== 0) {
        ab.push(data.inventory);
      } else {
        console.log("/");
      }

      // console.log("-------------ddddddddddddd", ab);
      ab.map((item) => {
        inventorydata.map((x) => {
          if (x._id === item) {
            aa.push(x);
          }
        });
      });

      setInventoryselect(aa);
    } else if (data.inventory === null) {
      console.log("hi");
    }
  }, [data]);

  function Rolehandeler(x) {
    // console.log("aa___++++", x);
    // console.log("roleman", roleman);
    let aa = "";
    if (x !== null) {
      roleman &&
        roleman.map((item) => {
          if (item.BackofficeRoleID == x) {
            aa = item.Role;

            return;
          }
        });
    }
    return aa;
  }
  // console.log("inventoryselect", inventoryselect);
  const Addhandler = () => {
    console.log("clicked");
  };
  return (
    <div className={css.container}>
      <div
        style={{
          ...styles.firstContainer,
        }}
        className={css.body}
      >
        <span>{data.user_id}</span>
      </div>
      <div
        style={{
          ...styles.adminContainer,
        }}
        className={css.body}
      >
        <span>{Rolehandeler(data.role)}</span>
      </div>
      <div
        style={{
          ...styles.checkboxcontainer,
        }}
        className={css.body}
      >
        <span>{data.last_name}</span>
      </div>
      <div
        style={{
          ...styles.checkboxcontainer,
        }}
        className={css.body}
      >
        <span>{data.first_name}</span>
      </div>
      <div
        style={{
          ...styles.checkboxcontainer,
        }}
        className={`${css.body} ${css.bodyday}`}
      >
        <span onClick={() => hubiarlasan(data)} className={css.btn2}>
          Харах
        </span>
      </div>
      <div
        style={{
          ...styles.checkboxcontainer,
        }}
        className={`${css.body} ${css.bodyday}`}
      >
        <span onClick={() => Shophubiarlasan(data)} className={css.btn2}>
          Хувиарласан
        </span>
      </div>
      <div
        style={{
          ...styles.checkboxcontainer,
        }}
        className={`${css.body} ${css.bodyday}`}
      >
        <span onClick={() => Dayhubiarlasan(data)} className={css.btn2}>
          Өдөр хуваарилах
        </span>
      </div>

      <div
        style={{
          ...styles.checkboxcontainer,
        }}
        className={`${css.body} ${css.bodyday}`}
        onClick={() => {
          setAguulahOpen(true);
        }}
      >
        <span className={css.btn2}>Агуулах нэмэх</span>
      </div>
      <div
        style={{
          ...styles.checkboxcontainer,
        }}
        className={`${css.body} ${css.bodyday}`}
        onClick={() => {
          setZoneOpen(true);
        }}
      >
        <span className={css.btn2}>Бүсчлэл нэмэх</span>
      </div>
      {/* <div
        style={{
          ...styles.checkboxcontainer,
        }}
        className={`${css.body} ${css.bodyday}`}
        onClick={() => {
          setChosedOpen(true);
        }}
      >
        <span className={css.btn2}>Дэлгүүр сонгох</span>
      </div> */}
      {aguulahOpen && (
        <Warehouse
          setAguulahOpen={setAguulahOpen}
          inventorydata={inventorydata}
          worksdata={worksdata}
          setWorksdata={setWorksdata}
          data={data}
        />
      )}
      {XTctx.hi && (
        <Onext
          data={onextdata}
          listdata={listdata}
          setWorksdata={setWorksdata}
          worksdata={worksdata}
        />
      )}
      {XTctx.calendarOpen && <Calendar xtdata={data} />}
      {shopopen && (
        <Shops
          data={data}
          listdata={listdata}
          setShopopen={setShopopen}
          inventorydata={inventorydata}
        />
      )}
      {dayopen && (
        <XTcalendar data={data} setDayopen={setDayopen} dayData={dayData} />
      )}
      {zoneOpen && (
        <Zone
          data={data}
          setZoneOpen={setZoneOpen}
          worksdata={worksdata}
          setWorksdata={setWorksdata}
        />
      )}
      {shosedOpen && <ShopIndex setChosedOpen={setChosedOpen} data={data} />}
    </div>
  );
};

export default Marshrut;
