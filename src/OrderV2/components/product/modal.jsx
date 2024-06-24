import { useEffect, useState } from "react";
import myHeaders from "../../../components/MyHeader/myHeader";
import "./modal_product.css"

export const ProductModal = ({ open, close, orderId, supId, submit }) => {
  const [data, setData] = useState([]);
  const [copy, setCopy] = useState([]);
  const [page, setPage] = useState(0);
  const [supplier, setSupplier] = useState(supId ? supId : null);
  const [productid, setProductid] = useState(null);
  const [search, setSearch] = useState([]);

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
    fetch(
      `https://api2.ebazaar.mn/api/products/get1?${params}page=${page}&limit=50`,
      requestOptions
    )
      .then((res) => res.json())
      .then((res) => {
        let update = res.data.map((item) => {
          return {
            ...item,
            chosed: false,
          };
        });
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
      <div className="popup-content_add prod_popup_order2">
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
        <span style={{ marginLeft: "30px", fontSize: "18px", fontWeight: 700 }}>
          Захиалгын дугаар: {orderId}
        </span>
        <div className="add_popup_search">
          {" "}
          <input
            autoFocus
            type="text"
            placeholder="Бүтээгдэхүүн хайх"
            onChange={(e) => setProductid(e.target.value)}
          />
        </div>
        <div className="add_popup_title prod_title_order2">
          <p>Бүтээгдэхүүний нэр</p>
          <p>Зураг</p>
          <p>Тоо ширхэг</p>
          <p>Нэгж үнэ</p>
          <p>Нийт дүн</p>
          <p>Action</p>
        </div>
        {/* End baraanii lsit garch irne */}
        <div
          className="head_list"
          style={{ height: "600px", marginBottom: "10px" }}
        >
          {search?.length > 0 && (
            <p style={{ fontWeight: 700 }}>Сонгосон Бүтээгдэхүүн</p>
          )}
          {search?.map((s, i) => {
            return (
              <ProductAddCard
                name={s.name}
                price={s.price}
                image={s.image}
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
            let priceValue = 0;
            let priceKeys = Object.keys(d.locations);
            if (priceKeys.length !== 0) {
              priceValue = d.locations[priceKeys[0]]?.price?.channel["1"];
            }

            return (
              <ProductAddCard
                add={(q) => {
                  console.log({
                    name: d.name,
                    image: d.image,
                    productId: d._id,
                    quantity: q,
                    price: d.stock,
                  });
                  console.log({
                    name: d.name,
                    image: d.image,
                    productId: d._id,
                    quantity: q,
                    price: priceValue,
                  });
                  setSearch((prev) => [
                    ...prev,
                    {
                      name: d.name,
                      image: d.image,
                      productId: d._id,
                      quantity: q,
                      price: priceValue,
                    },
                  ]);
                }}
                quantity={0}
                name={d.name}
                image={d.image}
                price={priceValue}
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
  image,
  price,
  add,
  remove,
  quantity,
  setQuantity,
}) => {
  return (
    <div className="add_popup_md">
      <span>{name}</span>
      <span> <img style={{width:"50px"}} src={image}/></span>
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
          <button className="btn_pp" onClick={remove}>Устгах</button>
        ) : (
          <button className="btn_p" onClick={() => add(quantity)}>Нэмэх</button>
        )}
      </span>
    </div>
  );
};
