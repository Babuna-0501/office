import React, { useState, useEffect, useContext } from "react";
import List from "./List";
import { Modal } from "antd";
import myHeaders from "../components/MyHeader/myHeader";
import { HeaderContext } from "../Hooks/HeaderHook";
import { HeaderContent } from "./HeaderContent";

const SpecialPermit = () => {
  const [data, setData] = useState();
  const [selected, setSelected] = useState();
  const [deg, setDeg] = useState(0);
  const [open, setOpen] = useState(false);

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
    let url = `https://api2.ebazaar.mn/api/tradeshop/files`;

    fetch(url, requestOptions)
      .then((r) => r.json())
      .then((res) => {
        setData(res);
      })
      .catch((error) => {
        // console.log("error messenger history get", error);
        alert("Алдаа гарлаа");
      });
  };
  // console.log("tradeshopid", props.tx.tradeshop_id);
  useEffect(() => {
    try {
      Fetchdata();
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "100%" }}>
        <div className="row header" style={{ padding: "0 12px" }}>
          <div style={{ width: "20%" }}>
            <div>file_id</div>
            <div>
              <input
                type="text"
                placeholder="Хайх ..."
                style={{ padding: "8px" }}
              />
            </div>
          </div>
          <div style={{ width: "50%" }}>
            <div>Огноо</div>
            <div>
              <input
                type="text"
                placeholder="Хайх ..."
                style={{ padding: "8px" }}
              />
            </div>
          </div>
          <div style={{ width: "50%" }}>
            <div>ID</div>
            <div>
              <input
                type="text"
                placeholder="Хайх ..."
                style={{ padding: "8px" }}
              />
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <div>Нэр</div>
            <div>
              <input
                type="text"
                placeholder="Хайх ..."
                style={{ padding: "8px" }}
              />
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <div>Утас</div>
            <div>
              <input
                type="text"
                placeholder="Хайх ..."
                style={{ padding: "8px" }}
              />
            </div>
          </div>
          <div style={{ width: "50%" }}>
            <div>Регистер</div>
            <div>
              <input
                type="text"
                placeholder="Хайх ..."
                style={{ padding: "8px" }}
              />
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <div>Дэлгэрэнгүй</div>
            <div>
              <input
                type="text"
                placeholder="Хайх ..."
                style={{ padding: "8px" }}
              />
            </div>
          </div>
          <div style={{ width: "20%" }}>
            <div>Статус</div>
            <div>
              <input
                type="text"
                placeholder="Хайх ..."
                style={{ padding: "8px" }}
              />
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <div>Зураг</div>
            <div>
              <input
                type="text"
                placeholder="Хайх ..."
                style={{ padding: "8px" }}
              />
            </div>
          </div>
        </div>
        <List data={data} setSelected={setSelected} setOpen={setOpen} />
      </div>
      {/* {selected !== null && (
				<div style={{ width: "40%" }}>
					<img src={data[selected].File.split(",")[0]} />
				</div>
			)} */}
      <div>
        <Modal
          centered
          open={open}
          onOk={() => {
            setOpen(false);
          }}
          onCancel={() => setOpen(false)}
          width="680px"
          // width="auto"
          bodyStyle={{ padding: "40px" }}
          className="noFooterModal"
        >
          <img
            src={selected}
            alt=""
            width={600}
            height={600}
            style={{
              rotate: `${deg}deg`,
              objectFit: "contain",
              // transition: "all 0.5s",
            }}
          />
          <div
            style={{
              width: "100%",
              justifyContent: "space-evenly",
              display: "flex",
              zIndex: 10,
              marginTop: "10px",
            }}
          >
            <button
              onClick={() => {
                setDeg(deg - 90);
              }}
            >
              Rotate left
            </button>
            <button
              onClick={() => {
                setDeg(deg + 90);
              }}
            >
              Rotate right
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SpecialPermit;
