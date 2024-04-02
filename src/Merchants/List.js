import React, { useState, useEffect } from "react";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import Merchant from "./Merchant";
import XLSX from "./XLSX";
import css from "./List.module.css";
import upload from "../assets/Upload_white.svg";
import InfiniteScroll from "react-infinite-scroll-component";
import myHeaders from "../components/MyHeader/myHeader";

const List = (props) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [buramhanmerchantIDS, setBuramhanmerchantsIDS] = useState([]);

  let [merchants, setMerchants] = useState([]);
  let [report, setReport] = useState(false);
  console.log("merchant props", props);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let params = "";

    if (props.searchID?.length > 3) {
      params += `id=${Number(props.searchID)}&`;
    }
    if (props.userPhoneNumber) {
      params += `phone=${props.shopPhoneNumber}&`;
    }
    if (props.registrationNumber) {
      params += `register=${props.registrationNumber}&`;
    }
    if (props.address) {
      params += `address=${props.address}&`;
    }
    if (props.shopPhoneNumber) {
      params += `user_phone=${props.shopPhoneNumber}&`;
    }
    if (props.city) {
      params += `city=${props.city}&`;
    }
    if (props.district) {
      params += `district=${props.district}&`;
    }
    if (props.khoroo) {
      params += `khoroo=${props.khoroo}&`;
    }
    if (props.customerName) {
      params += `customerName=${props.customerName}&`;
    }
    if (props.companyName) {
      params += `tradeshop_name=${props.companyName}&`;
    }
    if (props.busTypeState) {
      params += `business_type_id=${Number(props.busTypeState)}&`;
    }
    if (props.channel) {
      params += `channel=${Number(props.channel)}&`;
    }
    if (props.permitionCheck) {
      params += `alcohol_sale=${Number(props.permitionCheck)}&`;
    }

    let url = `https://api2.ebazaar.mn/api/merchants?${params}page=${page}`;
    console.log("merchant url", url);
    setLoading(true);
    fetch(url, requestOptions)
      .then((r) => r.json())
      .then((response) => {
				console.log("arig", response.data);
				setMerchants([...merchants, ...response.data]);
				setLoading(false);
			})
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  }, [page, props]);
  useEffect(() => {
    console.log("props, merchants list ", props);
    if (props.userData.company_id === "|14014|") {
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        `https://api2.ebazaar.mn/api/backoffice/users?company=14014`,
        requestOptions
      )
        .then((res) => res.json())
        .then((res) => {
          console.log("buramhan response ", res);
          let merchantids = [];
          res.data.map((item) => {
            if (item.tradeshop) {
              // console.log(Array.from(item.tradeshop));
              let arraay = item.tradeshop.replace("[", "");
              arraay = arraay.replace("]", "");

              merchantids.push(...arraay.split(","));
            }
          });
          // console.log("merchantsids", merchantids);
          setBuramhanmerchantsIDS(merchantids);
        })
        .catch((error) => {
          console.log("buramhan users fetch error", error);
        });
    }
  }, [props]);

  const permission = Object.values(JSON.parse(props.userData.permission))[0];

  // console.log("props.merchnatctx", props.merchantctx);
  // console.log(
  //   "props.merchnatctx.exportReport++++",
  //   props.merchantctx.exportReport
  // );
  return merchants ? (
    <div id="scrollableDiv" className={css.scrollcontainer}>
      {props.merchantctx.exportReport && permission.merchant.report && (
        <XLSX
          close={setReport}
          data={merchants}
          locations={props.locations}
          businessType={props.businessType}
          merchantctx={props.merchantctx}
        />
      )}
      <InfiniteScroll
        dataLength={merchants?.length}
        next={() => setPage((prev) => prev + 1)}
        hasMore={true}
        loader={
          merchants?.length === 0 && (
            <div className={css.loading}>
              <LoadingSpinner />
            </div>
          )
        }
        scrollableTarget="scrollableDiv"
      >
        {merchants.map((merchant, index) => {
          return (
            <Merchant
              data={merchant}
              userData={props.userData}
              locations={props.locations}
              businessType={props.businessType}
              key={index}
              suppliers={props.suppliers}
              buramhanmerchantIDS={buramhanmerchantIDS}
            />
          );
        })}
      </InfiniteScroll>
      <div id="blahblah"></div>
    </div>
  ) : null;
};

export default List;
