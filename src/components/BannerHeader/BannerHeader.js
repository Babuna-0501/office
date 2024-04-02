import React, { useContext } from "react";
import { Button } from "../common";
import css from "./bannerheader.module.css";
import BackOfficeHook from "../../Hooks/BackOfficeHook";
import myHeaders from "../MyHeader/myHeader";

const BannerHeader = () => {
  const bannerctx = useContext(BackOfficeHook);
  const SaveHandler = () => {
    // console.log("bannerctx.newBanner", bannerctx.newBanner);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        duration: 4000,
        auto: true,
        image: {
          desktop: bannerctx.newBanner,
          mobile: bannerctx.mobileBanner,
        },
      }),
      redirect: "follow",
    };
    // console.log("requestOptions update two", requestOptions);
    fetch(`https://api2.ebazaar.mn/api/updateBannerAll`, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log("banner response", res);
        if (res.code === 200) {
          alert(res.message);
        } else {
          alert(res.message);
        }
      })
      .catch((error) => {
        console.log("banner error", error);
      });
  };
  return (
    <Button variant="primary" size="medium" onClick={SaveHandler}>
      Өөрчлөлтыг хадгалах
    </Button>
  );
};

export default BannerHeader;
