import React, { useEffect, useState, useContext } from "react";
import css from "./newpromo.module.css";
import ProductTable from "../ProductTable/ProductTable";
import Products from "../../../components/Products/Products";
import myHeaders from "../../../components/MyHeader/myHeader";
import PromoHookV1 from "../../../Hooks/PromoHookV1";
import promodata from "./Promotype.json";
import setupdata from "./Setuptype.json";
import Background from "../Background/Background";
import ZoneIndex from "../Zone/ZoneIndex";
import Channel from "../Channel/Channel";
const NewPromo = () => {
  const [productopen, setProductopen] = useState(false);
  const [prodids, setProdids] = useState([]);
  const [products, setProducts] = useState([]);
  const [startdate, setStartdate] = useState(null);
  const [enddate, setEnddate] = useState(null);
  const [price, setPrice] = useState(null);
  const [percentone, setPercentone] = useState(null);
  const [percenttwo, setPercenttwo] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [channelOpen, setChannelOpen] = useState(false);
  const [zoneOpen, setZoneOpen] = useState(false);

  const promoctx = useContext(PromoHookV1);

  const CloseHandler = () => {
    setProductopen(false);
  };
  console.log("prodids", prodids);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let url = `https://api2.ebazaar.mn/api/products/get1?id=${prodids}`;
    console.log("url", url);
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log("res products", res);
        setProducts(res.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [prodids]);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let url = `https://api2.ebazaar.mn/api//backoffice/suppliers`;

    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        setSuppliers(res.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);
  console.log(suppliers)
  return (
    <div className={css.container}>
      <div>
        <div>Урамшуулал, хямдрал</div>
        <div className={css.onewrapper}>
          <div>
            <input
              placeholder="Гарчиг1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <span></span>
            <select>
              {promodata.map((item, index) => {
                return <option key={index}>{item.name}</option>;
              })}
            </select>
          </div>
        </div>
      </div>
      <div>
        <div>Нийлүүлэгч11</div>
        <div className={css.supwrapper}>
          <select>
            {suppliers &&
              suppliers.map((item, index) => {
                return (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
      <div>
        <div>Baraanii songolt</div>
        <div>
          <select>
            {suppliers &&
              suppliers.map((item, index) => {
                return (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
      <div>
        <div>Tohirgoo</div>
        <div>
          {promoctx.promotype === 1 ? (
            <div>
              <div>
                <span>Hub</span>
              </div>
              <div>
                <span>Niit uniin dun</span>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <span>X</span>
              </div>
              <div>
                <span>X + Y</span>
              </div>
            </div>
          )}
          <div>
            <div>
              <input
                placeholder="Hymdarliin hub"
                value={percentone}
                onChange={(e) => {
                  setPercentone(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                placeholder="Uniin dun"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
              <input
                placeholder="Hymdraliin hubi"
                value={percenttwo}
                onChange={(e) => {
                  setPercenttwo(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div>
          <div>
            <input
              type="date"
              value={startdate}
              onChange={(e) => {
                setStartdate(e.target.value);
              }}
            />
            <input
              type="date"
              value={enddate}
              onChange={(e) => {
                setEnddate(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              placeholder="Comment"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <ProductTable products={products} />
        <button
          onClick={() => {
            setProductopen(true);
          }}
        >
          Nemeh
        </button>
      </div>
      {promoctx.promotype === 2 ? (
        <div>
          <button>Beleg</button>
        </div>
      ) : null}
      <div>
        <div
          onClick={() => {
            setChannelOpen((prev) => !prev);
          }}
        >
          Subgiin tohirgoo
        </div>
        <div></div>
      </div>
      <div>
        <div
          onClick={() => {
            setZoneOpen((prev) => !prev);
          }}
        >
          Busiin tohirgoo
        </div>
        <div></div>
      </div>

      <div>
        <button>Cancel</button>
        <button>Confirm</button>
      </div>
      {productopen && (
        <Products
          onClose={CloseHandler}
          setProdids={setProdids}
          btnTitle="Songoh"
        />
      )}

      {channelOpen && (
        <Background>
          <Channel setChannelOpen={setChannelOpen} />
        </Background>
      )}
      {zoneOpen && (
        <Background>
          <ZoneIndex setZoneOpen={setZoneOpen} />
        </Background>
      )}
    </div>
  );
};

export default NewPromo;
