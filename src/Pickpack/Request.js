import React, { useState, useEffect } from "react";
import css from "./request.module.css";
import SingleProduct from "./SingleProduct";
import Header from "./components/Header/Header";
import { DatePicker, Space, TimePicker, Modal, Input, Checkbox } from "antd";
import moment from "moment";
import myHeaders from "../components/MyHeader/myHeader";
const { Search } = Input;

const Index = () => {
  const [description, setDescription] = useState(null);
  const [open, setOpen] = useState(false);
  const [checked, setCheck] = useState();
  const [checked2, setCheck2] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [prods, setProds] = useState();

  let filtered = prods
    ?.filter((e) => e.thirdparty_data?.pickpack?.sync === true)
    .map((a) => ({
      ...a,
      label: a.name,
      value: a._id,
    }));

  console.log("searchValue", searchValue);
  console.log("checked", checked);
  console.log("checked2", checked2);
  // console.log("date", date);
  // console.log("time", time);
  // console.log("description", description);

  const fetchProduct = () => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    let url = `https://api2.ebazaar.mn/api/products/get1?supplier=13884`; // 13884 13873
    fetch(url, requestOptions)
      .then((r) => r.json())
      .then((res) => {
        setProds(res.data);
      })
      .catch((error) => {
        console.log("error collection", error);
      });
  };

  useEffect(() => {
    try {
      fetchProduct();
    } catch (error) {
      console.log("catch error", error);
    }
  }, []);

  let last = checked2?.map((a, i) => ({
    totalUnit: a?.total_amount || 1,
    productSKU: a?.thirdparty_data?.pickpack?.sku,
    id: a?._id,
  }));

  const save = () => {
    if (date && time && description && last) {
      var raw = JSON.stringify({
        pickupdate: `${date}T${time}`,
        note: "ebazaar татан авалт",
        description: description,
        product: last,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      // console.log("pick puck requestOptions", requestOptions);

      fetch(`https://api2.ebazaar.mn/api/inventory/request`, requestOptions)
        .then((r) => r.json())
        .then((res) => {
          if (res.status === 200) {
            setCheck2([]);
            alert("Амжилттай хадгалагдлаа");
          } else {
            alert("Алдаа гарлаа, Мэдээлэлээ шалгаад дахин оролдоно уу");
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      alert("Мэдээлэл дутуу байна");
    }
  };

  const disabledDate = (current) => {
    return current && current._d < new Date(Date.now() - 86400000);
  };

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <Header
          title="Татан авалтын захиалга үүсгэх"
          fontsize="20px"
          color="#37474F"
          fontWeight="700"
          marginBottom="24px"
        />
        <Header
          title="Барааны мэдээлэл"
          fontsize="16px"
          fontWeight="600"
          marginBottom="16px"
        />
        <div style={{ maxHeight: "350px", overflowY: "scroll" }}>
          {checked2?.map((e, i) => (
            <SingleProduct
              e={e}
              i={i}
              setCheck2={setCheck2}
              checked2={checked2}
              key={e._id}
            />
          ))}
        </div>

        <div className={css.btnAddContainer}>
          <button onClick={() => setOpen(true)}> + Бараа нэмэх</button>
        </div>
      </div>
      <div
        className={css.wrapper}
        style={{
          marginTop: "1rem",
        }}
      >
        <div className={css.secondwrapper}>
          <div>
            <Header title="Татах огноо" fontsize="16px" fontWeight="600" />
            <Space direction="vertical">
              <DatePicker
                onChange={(_, dateString) => {
                  setDate(dateString);
                }}
                disabledDate={disabledDate}
                // value={date}
              />
            </Space>
          </div>
          <div>
            <Header title="Татах цаг" fontsize="16px" fontWeight="600" />
            <TimePicker
              onChange={(_, timeString) => {
                setTime(timeString);
              }}
              defaultValue={moment("00:00:00", "HH:mm:ss")}
              // value={time}
            />
          </div>
        </div>
      </div>
      <div></div>
      <div
        className={css.wrapper}
        style={{
          marginTop: "1rem",
        }}
      >
        <div>
          <Header title="Нэмэлт тэмдэглэл" fontsize="16px" fontWeight="600" />
          <textarea
            style={{
              width: "350px",
              outline: "none",
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #d9d9d9",
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div
        className={css.btncontainer}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <button
          onClick={() => {
            save();
          }}
        >
          Үүсгэх
        </button>
        {/* <button
					onClick={() => {
						// setDescription();
						// setCheck();
						// setCheck2([]);
						// setSearchValue();
						// setDescription();
						// setDate();
						// setTime();
					}}
				>
					Цэвэрлэх
				</button> */}
      </div>
      <Modal
        title="Бараа сонгох"
        centered
        open={open}
        onOk={() => {
          setCheck2(filtered.filter((e) => checked.includes(e._id)));
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
        width={500}
        okText={"Бараа сонгох"}
        cancelText={"Цуцлах"}
      >
        <Search
          placeholder="Хайлт хийх ..."
          onChange={(e) => setSearchValue(e.target.value)}
          style={{
            width: 400,
          }}
        />

        <Checkbox.Group
          options={
            searchValue
              ? filtered?.filter((e) =>
                  e.name?.toLowerCase()?.includes(searchValue?.toLowerCase())
                )
              : filtered
          }
          defaultValue={[]}
          onChange={(checkedValues) => setCheck(checkedValues)}
          style={{ maxHeight: "500px", overflowY: "scroll" }}
          // value={checked}
        />
      </Modal>
    </div>
  );
};

export default Index;
