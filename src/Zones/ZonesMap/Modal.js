import React, { useContext, useEffect, useState } from "react";
import css from "./modal.module.css";
import Select from "react-select";
import Maps from "./Maps";
import CloseIcon from "../../assets/close.svg";
import ZonesHook from "../../Hooks/ZonesHook";
import AppHook from "../../Hooks/AppHook";
import myHeaders from "../../components/MyHeader/myHeader";
// import Mongol from "./Mongol";

const Modal = (props) => {
  const zonesctx = useContext(ZonesHook);
  const appctx = useContext(AppHook);
  const [name, setName] = useState("");
  const [supplierInfo, setSupplirInfo] = useState([]);
  const [suppID, setSuppID] = useState(null);
  const [priority, setPriority] = useState(null);
  const cancelHandler = () => {
    zonesctx.setModal(false);
  };
  const [supplierData, setSupplierData] = useState([]);
  let defaultValueLabel = "-----";
  // console.log("suppID zone", suppID);
  // console.log("coordinates: zonesctx?.coords,", zonesctx?.coords);
  console.log("props", props);

  useEffect(() => {
    let controller = new AbortController();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      signal: controller.signal,
    };
    fetch("https://api2.ebazaar.mn/api/backoffice/suppliers", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setSupplirInfo(result.data);
        let options = [];
        result.data.map((category) => {
          options.push({ value: category.id, label: category.name });
          // if (category.id === 1228) {
          //   defaultValueLabel = category.name;
          // }
        });
        setSupplierData(options);
        controller = null;
      })
      .catch((error) => {
        console.log("error", error);
        // alert("Алдаа гарлаа.");
      });
    return () => controller?.abort();
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    let aaa = priority;
    aaa = parseInt(aaa);
    if (name.length === 0) {
      alert("Та бүсийн нэрийг оруулна уу...");
      return;
    }
    if (zonesctx?.coords.length === 0) {
      alert("Та бүсийн полигон зураагүй байна...");
      return;
    }

    // if (props.data.userData.company_id === "|1|") {
    //   if (suppID === null) {
    //     alert("Та нийлүүлэгчээ сонгоно уу...");
    //     return;
    //   }
    // }
    if (suppID === null) {
      alert("Та нийлүүлэгчээ сонгоно уу...");
      return;
    }

    if (zonesctx.coord === null) {
      alert("Та бүсчлэлээ зурна уу...");
      return;
    }

    if (!aaa) {
      alert(
        "Та бүсчлэлийн эрэмбийн мэдээлэл оруулаагүй байна. Хамгийн их утгатай нь хамгийн их эрэмбэтэй. Та 1000-аас дээш бүхэл тоо оруулна уу..."
      );
      return;
    }
    if (aaa < 1000) {
      alert(
        "Та бүсчлэлийн эрэмбийн мэдээлэл оруулаагүй байна. Хамгийн их утгатай нь хамгийн их эрэмбэтэй. Та 1000-аас дээш бүхэл тоо оруулна уу..."
      );
      return;
    }
    if (parseInt(priority) <= 1) {
      alert("Та 1-ээс өөр эерэг бүхэл тоо оруулна уу.");
      return;
    }
    // console.log("priority ereg buhel too", Number.isInteger(priority));
    let dateaa = new Date();
    let arr = [];
    zonesctx?.coords[0].map((item) => {
      arr.push(item);
    });

    arr.push(arr[0]);
    // console.log("zonesctx?.coords", arr);

    var raw = JSON.stringify({
      name: name,
      polygons: {
        type: "Polygon",
        coordinates: [arr],
        // priority:priority
      },
      priority: parseInt(priority),
      supplier: Number(suppID),
      // supplier:
      //   props.data.userData.company_id === "|1|"
      //     ? Number(suppID)
      //     : Number(props.data.userData.company_id.replaceAll("|", "")),
      isActive: 1,
      createdDate: dateaa.toISOString(),
      updateDate: null,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log("requestOptions zones", requestOptions);
    fetch("https://api2.ebazaar.mn/api/zones/add", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("maps result", result);
        if (result.code === 200) {
          alert("Та амжилттай хадгаллаа.");
          setName(null);
          setPriority(null);
          setSuppID(null);
          appctx.setPage(["zones"]);
          zonesctx.setCoords(null);
          zonesctx.setModal(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
        // alert(`Алдаа гарлаа. ${error}`);
      });
  };

  const handleChange = (selectedOptions) => {
    console.log("selectedOptions.value", selectedOptions.value);
    setSuppID(selectedOptions.value);
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#9e9e9e",
      minHeight: "42px",
      height: "42px",
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: "42px",
      padding: "0 4px",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "0px",
      height: "42px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "42px",
    }),
  };

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.headerContainer}>
          <div className={css.headerwrapper}>
            <input
              placeholder="Бүсчлэлийн нэр оруулах"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Эрэмбэ оруулах"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              type="number"
              className={css.inputpriority}
              style={{ width: "250px" }}
            />
            <div className={css.supContainer}>
              <Select
                options={supplierData}
                styles={customStyles}
                id="category"
                onChange={handleChange}
                defaultValue={{
                  label: defaultValueLabel,
                  // value: props.product.category_id,
                }}
              />
            </div>
            {/* {props.data.userData.company_id === "|1|" && (
              <div className={css.supContainer}>
                <Select
                  options={supplierData}
                  styles={customStyles}
                  id="category"
                  onChange={handleChange}
                  defaultValue={{
                    label: defaultValueLabel,
                    // value: props.product.category_id,
                  }}
                />
                <select onChange={handleChange}>
                  <option value="all">---</option>;
                  {supplierInfo.map((item, index) => {
                    return (
                      <option value={item.id} key={index}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            )} */}
          </div>
          <img src={CloseIcon} onClick={cancelHandler} />
        </div>

        <div className={css.mapContainer}>
          <Maps
            supplier={props.supplier}
            merchantdata={props.merchantsinfo}
            data={props}
          />
          {/* <Mongol /> */}
        </div>
        <div className={css.btnsContainer}>
          <button className={css.cancel} onClick={cancelHandler}>
            Цуцлах
          </button>
          <button className={css.approve} onClick={submitHandler}>
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
