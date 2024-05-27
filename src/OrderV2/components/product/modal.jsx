import { useEffect, useState } from "react";
import myHeaders from "../../../components/MyHeader/myHeader";

export const ProductModal = ({ open, close, orderId, supId, submit }) => {
  const [data, setData] = useState([]);
  const [copy, setCopy] = useState([]);
  const [page, setPage] = useState(0);
  const [supplier, setSupplier] = useState(supId ? supId : null);
  const [productid, setProductid] = useState(null);
  const [search, setSearch] = useState([]);
  const [productname, setProductname] = useState(null);
  const getData = () => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let params = "";
    if (supplier !== null) {
      params += `supplier=${supplier}&`;
    }
    if (search && search.length >= 3) {
      params += `search=${search}&`;
    }

    if (productid !== null) {
      params += `id=${productid}&`;
    }
console.log(
  "product url " +
    `https://api2.ebazaar.mn/api/products/get1?${params}page=${page}&limit=50`
);
    fetch(
      `https://api2.ebazaar.mn/api/products/get1?${params}page=${page}&limit=50`,
      requestOptions
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log("res", res);
        // let update = res.data.map((item) => {
        //   if (
        //     smsctx.prodIDS.length !== 0 &&
        //     smsctx.prodIDS.includes(item._id)
        //   ) {
        //     return {
        //       ...item,
        //       chosed: true,
        //     };
        //   } else {
        //     return {
        //       ...item,
        //       chosed: false,
        //     };
        //   }
        // });

        let update = res.data.map((item) => {
          return {
            ...item,
            chosed: false,
          };
        });
        console.log(res.data);
        setData(update);
        setCopy(update);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    getData();
    // }, [page, productid, barcode, sku, search, supplier]);
  }, [supplier]);

  useEffect(() => {
    let d = data.filter(
      (d) => d._id.toString().includes(productid) || d.name.includes(productid)
    );

    productid == "" || productid == null ? setCopy([]) : setCopy(d);
  }, [productid]);

  const productAdd = () => {
    submit(search);
    setCopy([]);
    setData([]);
    setProductid(null);
    setSearch([]);
    close();
  };

  const cancel = () => {
    setCopy([]);
    setData([]);
    setProductid(null);
    setSearch([]);
    close();
  };

  return (
    <div className={`add-popup ${open ? "active" : ""}`}>
      <div className="popup-content_add">
        <span className="close-button" onClick={close}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.452054 0.450101C0.940209 -0.0380545 1.73167 -0.0380545 2.21982 0.450101L15.5532 13.7834C16.0413 14.2716 16.0413 15.063 15.5532 15.5512C15.065 16.0394 14.2735 16.0394 13.7854 15.5512L0.452054 2.21787C-0.0361014 1.72971 -0.0361014 0.938256 0.452054 0.450101Z"
              fill="#1A1A1A"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.5532 0.450101C16.0413 0.938256 16.0413 1.72971 15.5532 2.21787L2.21982 15.5512C1.73167 16.0394 0.940209 16.0394 0.452054 15.5512C-0.0361014 15.063 -0.0361014 14.2716 0.452054 13.7834L13.7854 0.450101C14.2735 -0.0380545 15.065 -0.0380545 15.5532 0.450101Z"
              fill="#1A1A1A"
            />
          </svg>
        </span>
        <span style={{ marginLeft: "30px" }}>Захиалгын дугаар: {orderId}</span>
        <div className="add_popup_search">
          {" "}
          <input
            autoFocus
            type="text"
            placeholder="Бүтээгдэхүүн хайх"
            onChange={(e) => setProductid(e.target.value)}
          />
        </div>
        <div className="add_popup_title">
          <p>Бүтээгдэхүүний нэр</p>
          <p>Тоо ширхэг</p>
          <p>Нэгж үнэ</p>
          <p>Нийт үнийн дүн</p>
          <p>Action</p>
        </div>
        {/* End baraanii lsit garch irne */}
        <div style={{ height: "500px", overflow: "scroll" }}>
          {search?.length > 0 && <p>Сонгосон</p>}
          {search?.map((s, i) => {
            return (
              <ProductAddCard
                name={s.name}
                price={s.price}
                quantity={s.quantity}
                setQuantity={(e) => {
                  s.quantity = e;
                  setSearch((prev) => [...prev]);
                }}
                remove={() => {
                  setSearch(search.filter((d) => d.productId != s.productId));
                }}
              />
            );
          })}
          {productid != null && copy?.length > 0 && <p>Хайсан</p>}
          {copy?.map((d) => {
            return (
              <ProductAddCard
                add={(q) => {
                  setSearch((prev) => [
                    ...prev,
                    {
                      name: d.name,
                      productId: d._id,
                      quantity: q,
                      price: d.stock,
                    },
                  ]);
                }}
                quantity={0}
                name={d.name}
                price={d.stock}
              />
            );
          })}
        </div>
        <div className="add_popup_btn">
          <button onClick={() => cancel()}>Цуцлах</button>
          <button onClick={() => productAdd()}>Бүтээгдэхүүн нэмэх</button>
        </div>
      </div>
    </div>
  );
};

const ProductAddCard = ({
  name,

  price,
  add,
  remove,
  quantity,
  setQuantity,
}) => {
  return (
    <div className="add_popup_md">
      <span>{name}</span>
      <span>
        <input
          className="add_popup_quantity"
          type="number"
          value={quantity}
          pattern="[0-9.]"
          onChange={(e) => {
            let value = 0;
            if (e != null) {
              isNaN(parseFloat(e.target.value))
                ? (value = 0)
                : (value = parseFloat(e.target.value));
            }
            if (setQuantity != undefined) setQuantity(value);
          }}
        />
      </span>
      <span>{price}₮</span>
      <span>{Math.floor((quantity ?? 0) * price)}₮ </span>
      <span>
        {add == undefined ? (
          <button onClick={remove}>del</button>
        ) : (
          <button onClick={() => add(quantity)}>add</button>
        )}
      </span>
    </div>
  );
};
