import css from "./accountindex.module.css";
import myHeaders from "../../components/MyHeader/myHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import Account from "./Account";
import BusinessTable from "./BusinessTable";
import { useContext } from "react";
import { HeaderContext } from "../../Hooks/HeaderHook";
import { useEffect } from "react";
import { HeaderContent } from "./HeaderContent";
import { useState } from "react";
import { styles } from "./style";
import { LoadingSpinner } from "../../components/common";

const AccountIndex = (props) => {
  const { setHeaderContent } = useContext(HeaderContext);
  const [searchUser, setSearchUser] = useState("");
  const [searchBusiness, setSearchBusiness] = useState("");
  const [tradeshopId, setTradeshopId] = useState("");
  const [tradeshopName, setTradeshopName] = useState("");
  // const [businessType, setBusinessType] = useState("");
  // const [businessChannel, setBusinessChannel] = useState("");
  // const [city, setCity] = useState("");
  // const [district, setDistrict] = useState("");
  // const [khoroo, setKhoroo] = useState("");
  // const [address, setAddress] = useState("");

  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(1);
  // const [loading, setLoading] = useState(false);
  const [sfa, setSfa] = useState(null);

  let params = "";
  if (searchUser.length > 5) {
    params += `users=${searchUser}&`;
  }
  if (searchBusiness.length >= 4) {
    params += `businesses=${searchBusiness}&`;
  }
  if (tradeshopId.length > 2) {
    params += `tradeshopId=${tradeshopId}&`;
  }
  if (tradeshopName) {
    params += `tradeshopName=${tradeshopName}&`;
  }
  // if (userEmail) {
  //   params += `email=${userEmail}&`;
  // }
  // if (userNumber) {
  //   params += `phone=${userNumber}&`;
  // }
  // if (businessId > 2) {
  //   params += `businessId=${businessId}&`;
  // }
  // if (register) {
  //   params += `register=${register}&`;
  // }
  // if (businessName) {
  //   params += `businessName=${businessName}&`;
  // }
  // if (tradeshopName) {
  //   params += `tradeshopName=${tradeshopName}&`;
  // }

  useEffect(() => {
    if (datas) {
      for (const data of datas) {
        if (data.sfa === true) {
          setSfa(true);
          break;
        }
      }
    }
  }, [datas]);

  useEffect(() => {
    const getFilterRequest = () => {
      const url = `https://api2.ebazaar.mn/users/alldata?page=${page}&limit=3000&${params}`;
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(url, requestOptions)
        .then((res) => res.json())
        .then((response) => setDatas(response.data));
    };
    getFilterRequest();
  }, [params, page]);

  useEffect(() => {
    setHeaderContent(<HeaderContent sfa={sfa} />);

    return () => {
      setHeaderContent(<></>);
    };
  }, [sfa]);

  return (
    <div className={css.container}>
      <div className={css.accounts}>
        <div
          className="header row"
          style={{ padding: "0 0px", borderBottom: "0.8px solid #CCCCCC" }}
        >
          {/* ----------------ACCOUNTS--------------- */}
          {sfa ? null : (
            <div style={{ ...styles.accounts }}>
              <div className={css.w700}>Users</div>
              <div>
                <input
                  type="text"
                  placeholder="Хайх ..."
                  style={{ padding: "8px" }}
                  onChange={(e) => setSearchUser(e.target.value)}
                  value={searchUser}
                />
              </div>
            </div>
          )}

          {/* ----------------BUSINESS--------------- */}

          <div style={{ ...styles.businesses }}>
            <div className={css.w700}>Businesses</div>
            <div>
              <input
                onChange={(e) => setSearchBusiness(e.target.value)}
                type="text"
                placeholder="Хайх ..."
                style={{ padding: "8px" }}
                value={searchBusiness}
              />
            </div>
          </div>

          {/* ----------------TRADESHOP--------------- */}

          <div style={{ ...styles.tradeshopId, padding: "0" }}>
            <div className={css.w700}>T-ID</div>
            <div>
              <input
                onChange={(e) => setTradeshopId(e.target.value)}
                type="text"
                placeholder="Хайх ..."
                // style={{ padding: "8px" }}
              />
            </div>
          </div>

          <div style={{ ...styles.tradeshopName }}>
            <div className={css.w700}>T-Name</div>
            <div>
              <input
                onChange={(e) => setTradeshopName(e.target.value)}
                type="text"
                placeholder="Хайх ..."
                style={{ padding: "8px" }}
              />
            </div>
          </div>

          <div style={{ ...styles.tradeshopType }}>
            <div className={css.w700}>T-Type</div>
            <div>
              <input
                // onChange={(e) => setTradeshopName(e.target.value)}
                disabled={true}
                type="text"
                placeholder="Хайх ..."
                style={{ padding: "8px" }}
              />
            </div>
          </div>

          <div style={{ ...styles.tradeshopChannel }}>
            <div className={css.w700}>T-Channel</div>
            <div>
              <input
                // onChange={(e) => setTradeshopName(e.target.value)}
                disabled={true}
                type="text"
                placeholder="Хайх ..."
                style={{ padding: "8px" }}
              />
            </div>
          </div>

          <div style={{ ...styles.tradeshopCity }}>
            <div className={css.w700}>City</div>
            <div>
              <input
                disabled={true}
                // onChange={(e) => setTradeshopName(e.target.value)}
                type="text"
                placeholder="Хайх ..."
                style={{ padding: "8px" }}
              />
            </div>
          </div>

          <div style={{ ...styles.tradeshopDistrict }}>
            <div className={css.w700}>District</div>
            <div>
              <input
                disabled={true}
                // onChange={(e) => setTradeshopName(e.target.value)}
                type="text"
                placeholder="Хайх ..."
                style={{ padding: "8px" }}
              />
            </div>
          </div>

          <div style={{ ...styles.tradeshopKhoroo }}>
            <div className={css.w700}>Khoroo</div>
            <div>
              <input
                disabled={true}
                // onChange={(e) => setTradeshopName(e.target.value)}
                type="text"
                placeholder="Хайх ..."
                style={{ padding: "8px" }}
              />
            </div>
          </div>

          <div style={{ ...styles.tradeshopAddress }}>
            <div className={css.w700}>Address</div>
            <div>
              <input
                disabled={true}
                // onChange={(e) => setTradeshopName(e.target.value)}
                type="text"
                placeholder="Хайх ..."
                style={{ padding: "8px" }}
              />
            </div>
          </div>

          <div style={{ ...styles.tradeshopAlcohol, padding: "0" }}>
            <div className={css.w700}>Тусгай ...</div>
            <div>
              <input disabled style={{ padding: "8px" }} />
            </div>
          </div>
        </div>
      </div>

      {/* -----------------DATAS--------------------- */}
      <div id="scrollableDiv" className={css.scrollcontainer}>
        <InfiniteScroll
          dataLength={datas?.length}
          next={() => datas.length > 20 && setPage((prev) => prev + 1)}
          hasMore={true}
          loader={
            datas?.length === 0 && (
              <div className={css.loading}>
                <LoadingSpinner />
              </div>
            )
          }
          scrollableTarget="scrollableDiv"
        >
          {datas ? (
            datas.map((data, index) => {
              return (
                <div key={index}>
                  {data.sfa === false ? (
                    <Account
                      locations={props.locations}
                      businessType={props.businessType}
                      suppliers={props.suppliers}
                      data={data}
                      userData={props.userData}
                      index={index}
                      sfa={sfa}
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "81px",
                      }}
                    >
                      {data.businesses.map((business) => {
                        return (
                          <BusinessTable
                            key={index}
                            business={business}
                            suppliers={props.suppliers}
                            locations={props.locations}
                            businessType={props.businessType}
                            userData={props.userData}
                            mainIndex={index}
                            sfa={sfa}
                            data={data}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Мэдээлэл байхгүй байна.
            </div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};
export default AccountIndex;
