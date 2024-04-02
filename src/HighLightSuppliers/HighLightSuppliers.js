import React, { useEffect, useState, useContext } from "react";
import BackOfficeHook from "../Hooks/BackOfficeHook";
import css from "./highsuppliers.module.css";
import { Button } from "../components/common/Button";
import myHeaders from "../components/MyHeader/myHeader";

const HighLightSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const dragItem = React.useRef(null);
  const dragOverItem = React.useRef(null);

  const backctx = useContext(BackOfficeHook);
  useEffect(() => {
    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`https://api2.ebazaar.mn/api/component/getSuppliers`, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        let ids = [];
        res.message.map((item) => {
          ids.push(item.id);
        });
        let data = [...res.message];

        backctx.suppliers.map((x) => {
          if (!ids.includes(x.id)) {
            data.push({
              id: x.id,
              name: x.name,
              icon: x.media,
            });
          }
        });
        setSuppliers(data);
      })
      .catch((error) => {
        console.log("Алдаа гарлаа.", error);
      });
  }, []);

  const sortHandler = () => {
    let changedSuppliers = [...suppliers];
    const draggedItemContent = changedSuppliers.splice(dragItem.current, 1)[0];
    changedSuppliers.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setSuppliers(changedSuppliers);
  };
  const CancelHandler = () => {
    window.location.reload();
  };
  const SubmitHandler = () => {
    let data = suppliers.slice(0, 12).map((item) => {
      return {
        id: item.id,
        name: item.name,
        icon: item.icon,
      };
    });
    // console.log("data new", data);
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow",
    };
    // console.log("requestoptions", requestOptions);
    fetch(
      `https://api2.ebazaar.mn/api/component/updateSuppliers`,
      requestOptions
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) {
          alert(res.message);
          window.location.replace("/");
        }
      })
      .catch((error) => {
        console.log(error);
        alert(`Алдаа гарлаа ${error.message}`);
      });
  };
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.header}>Онцгой нийлүүлэгч</div>
        <div className={css.body}>
          {suppliers.map((item, index) => {
            return (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => (dragItem.current = index)}
                onDragEnter={(e) => (dragOverItem.current = index)}
                onDragEnd={sortHandler}
                onDragOver={(e) => e.preventDefault()}
                style={{
                  background: index < 12 ? "#00000014" : "#fff",
                }}
                className={css.onesupplier}
              >
                <span className={css.image}>
                  <img src={item.icon} alt={item.name} />
                </span>
                <span> {item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className={css.btncontainer}>
        <Button variant="secondary">
          <span onClick={CancelHandler}>Цуцлах</span>
        </Button>
        <Button variant="primary">
          {" "}
          <span
            style={{
              color: "#fff",
            }}
            onClick={SubmitHandler}
          >
            Хадгалах
          </span>
        </Button>
      </div>
    </div>
  );
};

export default HighLightSuppliers;
