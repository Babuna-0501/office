import React, { useContext, useState, useEffect } from "react";
import css from "./updatemodal.module.css";
import UpdateMaps from "./UpdateMaps";
import CloseIcon from "../../assets/close.svg";
import ZonesHook from "../../Hooks/ZonesHook";
import AppHook from "../../Hooks/AppHook";
import myHeaders from "../../components/MyHeader/myHeader";

const UpdateModal = (props) => {
  const zonesctx = useContext(ZonesHook);
  const appctx = useContext(AppHook);
  const [name, setName] = useState("");
  const [updateData, setUpdateData] = useState(null);
  const [priority, setPriority] = useState(null);
  const [supplierid, setSupplierid] = useState(null);
  const [supplierInfo, setSupplirInfo] = useState([]);
  const [suppID, setSuppID] = useState(null);

  const cancelHandler = () => {
    zonesctx.setUpdateID("");
    zonesctx.setCoords(null);
    zonesctx.setUpdateModal(false);
  };

  const submitHandler = () => {
    let aaa = priority;

    aaa = parseInt(aaa);

    if (name.length === 0) {
      alert("Та бүсчлэлийн нэрээ оруулна уу");
      return;
    }
    if (!aaa) {
      alert(
        "Та бүсчлэлийн эрэмбийн мэдээлэл оруулаагүй байна. Хамгийн их утгатай нь хамгийн их эрэмбэтэй. Та эерэг бүхэл тоо оруулна уу..."
      );
      return;
    }
    if (aaa < 1000) {
      alert(
        "Та бүсчлэлийн эрэмбийн мэдээлэл оруулаагүй байна. Хамгийн их утгатай нь хамгийн их эрэмбэтэй. Та 1000-аас дээш бүхэл тоо оруулна уу..."
      );
      return;
    }
    if (!suppID) {
      alert("Та нийлүүлэгчээ сонгоно уу...");
      return;
    }
    if (parseInt(priority) <= 1) {
      alert("Та 1-ээс өөр эерэг бүхэл тоо оруулна уу.");
      return;
    }
    if (aaa) {
      let coor = [];
      zonesctx?.coords?.map((item) => {
        coor.push([item.lng, item.lat]);
      });
      coor.push(coor[0]);
      let dateaa = new Date();
      // console.log("update data", updateData);
      var raw = JSON.stringify({
        id: zonesctx.updateID,
        update: {
          ...updateData,
          name: name,
          polygons: {
            type: "Polygon",
            coordinates: [coor],
          },
          supplier: Number(suppID),
          updateDate: dateaa.toISOString(),
          priority: parseInt(priority),
        },
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      console.log("zone updat ", requestOptions);

      fetch("https://api2.ebazaar.mn/api/zones/update", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // console.log("result", result);
          if (result.code === 200) {
            alert("Та амжилттай шинэчлэлээ.");
            zonesctx.setUpdateID("");
            zonesctx.setCoords(null);
            appctx.setPage(["zones"]);
            zonesctx.setUpdateModal(false);
            setSuppID(null);
          }
        })
        .catch((error) => {
          alert("Алдаа гарлаа.", error);
          console.log("error", error);
        });
    } else {
      alert("Та бүсчлэлийн эрэмбээр эерэг бүхэл тоо оруулах боломжтой.");
      return;
    }
  };

  // console.log("supplioerid", supplierid);

  useEffect(() => {
    let controller = new AbortController();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      signal: controller.signal,
    };
    fetch(
      `https://api2.ebazaar.mn/api/backoffice/suppliers?id=${supplierid}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log("maps supplier", result);
        setSupplirInfo(result.data);
        controller = null;
      })
      .catch((error) => {
        console.log("error aldaa", error);
        // alert("Алдаа гарлаа.");
      });
    return () => controller?.abort();
  }, [supplierid]);
  const handleChange = (e) => {
    setSuppID(e.target.value);
  };

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.headerContainer}>
          <input
            placeholder="Бүсчлэлийн нэр шинэчлэх"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Бүсчлэлийн эрэмбэ оруулах"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            type="number"
            className={css.inputpriority}
            style={{ width: "250px" }}
          />
          <div className={css.supContainer}>
            {supplierInfo !== null && supplierInfo !== undefined && (
              <select onChange={handleChange}>
                <option value="all">---</option>;
                {supplierInfo?.map((item, index) => {
                  return (
                    <option value={item.id} key={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            )}
            {supplierInfo === null && supplierInfo === undefined && (
              <select onChange={handleChange}>
                <option value="all">---</option>;
                {supplierInfo?.map((item, index) => {
                  return (
                    <option value={item.id} key={index}>
                      hi
                    </option>
                  );
                })}
              </select>
            )}
          </div>

          <img src={CloseIcon} onClick={cancelHandler} />
        </div>
        <div className={css.mapContainer}>
          <UpdateMaps
            supplier={props.supplier}
            setName={setName}
            setUpdateData={setUpdateData}
            setPriority={setPriority}
            setSupplierid={setSupplierid}
          />
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

export default UpdateModal;
