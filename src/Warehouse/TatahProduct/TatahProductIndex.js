import React, { useEffect, useState, useContext } from "react";
import css from "./tatahproduct.module.css";
import xicon from "../../assets/close.svg";
import myHeaders from "../../components/MyHeader/myHeader";
import AppHook from "../../Hooks/AppHook";

const TatahProductIndex = (props) => {
  const [onebaraaState, setOnebaraaState] = useState([]);
  const [onebaraaStock, setOnebaraaStock] = useState(null);
  const [baraa, setBaraa] = useState(null);
  const [notes, setNotes] = useState(null);
  const appctx = useContext(AppHook);

  useEffect(() => {
    setOnebaraaState(props.onebaraa);
    setOnebaraaStock(props.onebaraastock);
  }, [props]);
  const tataltHandler = () => {
    if (baraa === null) {
      alert("Та татан авах тоогоо оруулна уу");
      return;
    }
    if (baraa > onebaraaState.stock) {
      alert("Та үндсэн агуулахын үлдэгдэл хүрэлцэхгүй байна.");
      return;
    }
    let aa = props.productStock;
    let leftStock = aa[`${onebaraaState._id}`].stock["0"];
    // console.log("leftstock", leftStock["0"]);
    let tatoal = leftStock + Number(baraa);
    aa[`${onebaraaState._id}`].stock["0"] = leftStock + Number(baraa);
    console.log("aa", aa);
    let productnumberHI = onebaraaState._id;
    let aabb = {};
    aabb[`${productnumberHI}`] = Number(baraa);
    // console.log("productnumberHI", aabb);
    // console.log("appctx", appctx.selectedWareHouse);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify({
        to: appctx.selectedWareHouse._id,
        note: notes ? notes : "Татан авалт",
        date: new Date(),
        products: aabb,
      }),
    };
    console.log("requestOptions", requestOptions);
    fetch(`https://api2.ebazaar.mn/api/warehouse/transfer`, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        // console.log("res", res);
        if (res.code === 200) {
          let updatestock = props.productStock;
          updatestock[`${onebaraaState._id}`].stock["0"] =
            leftStock + Number(baraa);

          let newProducts = [...props.products];
          newProducts.find((item) => item._id === onebaraaState._id).sku =
            Number(baraa);

          props.setProductStock(updatestock);
          props.setProducts(newProducts);
          let aa = JSON.parse(requestOptions.body);

          let product_line = [];

          Object.entries(aa.products).forEach((entry) => {
            const [key, value] = entry;

            product_line.push({
              product_id: Number(key),
              quantity: Number(value),
            });
          });
          let rawdata = {
            document_id: Math.floor(Math.random() * 10000),
            warehouse: aa.to,
            product_line: product_line,
          };
          fetch(`https://api2.ebazaar.mn/api/inventory/insert/new`, {
            method: "POST",
            headers: myHeaders,
            redirect: "follow",
            body: JSON.stringify(rawdata),
          })
            .then((res) => {
              console.log("orlogiin tuuh ruu nemlee", res);
            })
            .catch((error) => {
              console.log("orlogiin tuuh aldaa garlaa");
            });

          props.setProductStock(aa);
          setBaraa(null);
          setOnebaraaState([]);
          setOnebaraaStock(null);
          props.setTatahProduct(false);
        }
      })
      .catch((error) => {
        console.log("warehouse transfer error", error);
      });
  };

  return (
    <div className={css.container}>
      <div className={css.empty}></div>

      <div className={css.wrapper}>
        <div className={css.imagecontainer}>
          <img
            src={xicon}
            alt="close icon "
            onClick={() => {
              props.setTatahProduct(false);
              props.setOnebaraastock(null);
              props.setOnebaraa(null);
            }}
          />
        </div>
        <div>
          <div className={css.subwrapper}>
            <span className={css.bold}>Барааны нэр : {` `}</span>
            <span className={css.two}>{`  ${
              onebaraaState ? onebaraaState.name : null
            } `}</span>
          </div>
          <div className={css.subwrapper}>
            <span className={css.bold}>Барааны sku : </span>
            <span className={css.two}>
              {` ${onebaraaState ? onebaraaState.sku : null}`}{" "}
            </span>
          </div>
          <div className={css.subwrapper}>
            <span className={css.bold}>Барааны barcode : </span>
            <span className={css.two}>
              {` ${onebaraaState ? onebaraaState.bar_code : null}`}{" "}
            </span>
          </div>
          <div className={css.subwrapper}>
            <span className={css.bold}>
              Барааны үндсэн агуулахын үлдэгдэл :{" "}
            </span>
            <span className={css.two}>{` ${
              onebaraaState.stock ? onebaraaState.stock.toLocaleString() : null
            }ш`}</span>
          </div>
        </div>
        <div className={css.middlewrapper}>
          <h4>Татах барааны мэдээлэл</h4>
          <div className={css.subwrapper}>
            <span className={css.bold}>Барааны нэр : {` `}</span>
            <span className={css.two}>{`  ${
              onebaraaState ? onebaraaState.name : null
            } `}</span>
          </div>
          <div className={css.subwrapper}>
            <span className={css.bold}>Агуулахын үлдэгдэл : {` `}</span>
            <span className={css.two}>{`  ${
              onebaraaStock ? onebaraaStock : null
            }ш`}</span>
          </div>
        </div>
        <div className={css.middlewrapper}>
          <h4>Нэмэлт татан авалт</h4>
          <div className={css.subwrapper}>
            <span className={css.bold}>Бараа татан авах тоо : {` `}</span>
            <input
              value={baraa}
              type="number"
              className={css.subinput}
              onChange={(e) => setBaraa(e.target.value)}
            />
          </div>
          <div
            className={css.subwrapper}
            style={{
              marginTop: "16px",
            }}
          >
            <span className={css.bold}>Татан авалтын тэмдэглэл : {` `}</span>
            <input
              value={notes}
              type="text"
              className={css.subinput}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className={css.btncontainer}>
            <button onClick={tataltHandler}>Татан авах</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TatahProductIndex;
