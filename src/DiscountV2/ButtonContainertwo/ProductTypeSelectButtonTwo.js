import React, { useContext } from "react";
import css from "./producttypeselectbuttontwo.module.css";
import PromoHook from "../../Hooks/PromoHook";
import myHeaders from "../HeaderContent/HeaderContent";

const ProductTypeSelectButtonTwo = (props) => {
  const ctx = useContext(PromoHook);
  const CancelHandler = () => {
    // console.log("cancel handler");

    props.setStartDateValue(null);
    props.setEndDateValue(null);
    ctx.setPromoChannel([]);
    props.setDiscountTitle("");
    props.setComments("");
    ctx.setGiftProduct([]);

    ctx.setNextPage(false);
  };
  const ApproveHandlerTwo = () => {
    // alert("GHi");
    // console.log("approve handler");
    let channel = [];
    let productIDS;
    let sku;
    let supplierIDS;
    // console.log(" ctx.promoChannel", ctx.promoChannel);
    ctx.promoChannel.forEach((data) => {
      channel.push(data.business_type_id);
    });
    // console.log(" ctx.collectionProduct", ctx.collectionProduct);
    ctx.collectionProduct.map((item) => {
      productIDS = item.product_id;
      sku = item.sku;
      supplierIDS = item.supplier;
    });
    if (props.discountTitle.length === 0) {
      alert("Та урамшууллын гарчигаа оруулна уу.");
      return;
    }
    if (props.comments.length === 0) {
      alert("Та урамшууллын дэлгэрэнгүй бичиглэлээ оруулна уу.");
      return;
    }
    if (props.channelOptionDefault.length === 0) {
      alert("Та урамшууллын сувгаа оруулна уу.");
      return;
    }
    if (props.zoneMapIDS.length === 0) {
      alert("Хямдралын бүсчлэлийн мэдээлэл байхгүй байна.");
      return;
    }
    if (props.startDateValue === null) {
      alert("Та хямдралын эхлэх огноо оруулна уу!!!");
      return;
    }
    if (props.endDateValue === null) {
      alert("Та хямдралын дуусах огноо оруулна уу!!!");
      return;
    }
    if (props.discountGiftValue === null) {
      alert("Та бэлгийн утгаа оруулна уу!!!");
      return;
    }
    if (props.discountValue === null) {
      alert("Та хямдралын утгаа оруулна уу!!!");
      return;
    }
    console.log(
      "Number(ctx.insertTypeProduct)",
      Number(props.insertTypeProduct)
    );
    if (Number(props.insertTypeProduct) === 500) {
      console.log(
        "console.log 500 ++++, olon baraand , nemelt uramshuulal oruulah"
      );
      console.log("ctx.giftProduct", ctx.giftProduct);
      // if (ctx.giftProduct.length === 0) {
      //   alert("Та хямдралын бэлэгээ оруулаагүй байна.");
      //   return;
      // }
      // let cond = [];
      // let package_id = Math.floor(Math.random() * 1000);
      // let prodID = [];
      // let suppID;

      ctx.products.map((item) => {
        let cond = [];
        let package_id = Math.floor(Math.random() * 1000);
        let prodID = [];
        let suppID;

        cond.push({
          package_id: package_id,
          threshold_qty: Number(props.discountValue),
          min_csku_qty: 0,
          sku: item.sku,
          gift_qty: 0,
          is_gift: false,
          product_id: item._id,
          product_name: item.name,
        });
        cond.push({
          package_id: item._id,
          threshold_qty: 0,
          min_csku_qty: 0,
          sku: item.sku,
          // gift_qty: Number(props.discountGiftValue),
          gift_qty: Number(props.discountGiftValue),
          is_gift: true,
          product_id: item._id,
          product_name: item.name,
        });

        prodID.push(item._id);
        suppID = item.supplier_id;
        const rawData = {
          discount_data: {
            title: props.discountTitle,
            discounttype: 3,
            type: "gifts",
            value: 0,
            threshold_amount: 0,
            description: props.comments,
          },
          conditions: cond,
          locations: props.zoneMapIDS,
          channel_id: props.channelOptionDefault,
          products: prodID,
          start_date: props.startDateValue,
          end_date: props.endDateValue,
          // supplierID: supplierIDS,
          supplierID: suppID,
        };
        let requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(rawData),
        };
        console.log(
          "treshold 500 requesOptions --- 10+1 uramshuulal",
          requestOptions
        );
        let url = `https://api2.ebazaar.mn/api/discount/add`;
        fetch(url, requestOptions)
          .then((r) => r.json)
          .then((res) => {
            console.log("response add ", res);
            // alert("Амжилттай нэмэгдлээ.1");
            // ctx.setNextPage(false);
            // props.setStartDateValue(null);
            // props.setEndDateValue(null);
            // ctx.setPromoChannel([]);
            // props.setDiscountTitle("");
            // props.setComments("");
            // ctx.setGiftProduct([]);
          })
          .catch((error) => {
            console.log("promo add error", error);
            alert("Алдаа гарлаа.", error);
          });
      });
      alert("Амжилттай нэмэгдлээ.1");
      ctx.setNextPage(false);
      props.setStartDateValue(null);
      props.setEndDateValue(null);
      ctx.setPromoChannel([]);
      props.setDiscountTitle("");
      props.setComments("");
      ctx.setGiftProduct([]);
      // ctx.giftProduct.map((x) => {
      //   let id = x.package_id;
      //   // console.log("x", x);
      //   x.dete.map((item) => {
      //     cond.push({
      //       package_id: id,
      //       threshold_qty: 0,
      //       min_csku_qty: 0,
      //       sku: x.sku,
      //       gift_qty: Number(props.discountGiftValue),
      //       is_gift: true,
      //       product_id: item.product_id,
      //       product_name: item.product_name,
      //     });
      //   });
      // });
      // const rawData = {
      //   discount_data: {
      //     title: props.discountTitle,
      //     discounttype: 3,
      //     type: "gifts",
      //     value: 0,
      //     threshold_amount: 0,
      //     description: props.comments,
      //   },
      //   conditions: cond,
      //   locations: props.zoneMapIDS,
      //   channel_id: props.channelOptionDefault,
      //   products: prodID,
      //   start_date: props.startDateValue,
      //   end_date: props.endDateValue,
      //   // supplierID: supplierIDS,
      //   supplierID: suppID,
      // };
      // let requestOptions = {
      //   method: "POST",
      //   headers: myHeaders,
      //   body: JSON.stringify(rawData),
      // };
      // console.log("treshold 500 requesOptions", requestOptions);
      // let url = `https://api2.ebazaar.mn/api/discount/add`;
      // fetch(url, requestOptions)
      //   .then((r) => r.json)
      //   .then((res) => {
      //     console.log("response add ", res);
      //     alert("Амжилттай нэмэгдлээ.1");
      //     ctx.setNextPage(false);
      //     props.setStartDateValue(null);
      //     props.setEndDateValue(null);
      //     ctx.setPromoChannel([]);
      //     props.setDiscountTitle("");
      //     props.setComments("");
      //     ctx.setGiftProduct([]);
      //   })
      //   .catch((error) => {
      //     console.log("promo add error", error);
      //     alert("Алдаа гарлаа.", error);
      //   });

      /////// BARAA OOR HYMDRALD HAMRAGDSAN BAIGAA ESEHIIG SHALGADAG
      // fetch(
      //   `https://api2.ebazaar.mn/api/discounts?product_ids=[${rawData.products}]`,
      //   {
      //     method: "GET",
      //     headers: myHeaders,
      //   }
      // )
      //   .then((r) => r.json())
      //   .then((response) => {
      //     console.log("res", response);
      //     let aa = false;
      //     let ids = [];
      //     response.map((item) => {
      //       if (
      //         Number(item.discount_data.discounttype) === 3 &&
      //         item.discount_data.type === rawData.discount_data.type
      //       ) {
      //         aa = true;
      //         ids.push(item.products);
      //       }
      //     });
      //     console.log("aa", aa);

      //     if (aa) {
      //       let uniqueIDS = [];
      //       ids.forEach((c) => {
      //         if (!uniqueIDS.includes(c)) {
      //           uniqueIDS.push(c);
      //         }
      //       });
      //       alert(
      //         `Бүтээгдэхүүн ижил төрлийн хямдралд бүртгэгдсэн байна. Бүтээгдэхүүний ID : ${uniqueIDS}`
      //       );
      //       return;
      //     } else if (aa === false) {
      //       console.log("aa request 500 x+x", requestOptions);
      //       let url = `https://api2.ebazaar.mn/api/discount/add`;
      //       fetch(url, requestOptions)
      //         .then((r) => r.json)
      //         .then((res) => {
      //           console.log("response add ", res);
      //           alert("Амжилттай нэмэгдлээ.1");
      //           ctx.setNextPage(false);
      //           props.setStartDateValue(null);
      //           props.setEndDateValue(null);
      //           ctx.setPromoChannel([]);
      //           props.setDiscountTitle("");
      //           props.setComments("");
      //           ctx.setGiftProduct([]);
      //         })
      //         .catch((error) => {
      //           console.log("promo add error", error);
      //           alert("Алдаа гарлаа.", error);
      //         });
      //     }
      //   })
      //   .catch((error) => {
      //     console.log("promo add error", error);
      //   });
      /////// BARAA OOR HYMDRALD HAMRAGDSAN BAIGAA ESEHIIG SHALGADAG TOGSOB
    } else if (Number(props.insertTypeProduct) === 1000) {
      console.log("console.log 1000 , bosgotoi uramshuulal");
      console.log("ctx.thresholdList", ctx.thresholdList);
      console.log("ctx.products", ctx.products);

      let cond = [];

      let package_id = Math.floor(Math.random() * 1000);

      ctx.thresholdList.map((item) => {
        if (Number(ctx.thresholdType) === 1) {
          ctx.products.map((x) => {
            // console.log("product", x);
            cond.push({
              package_id: package_id,
              threshold_qty: 0,
              min_csku_qty: 0,
              sku: x.sku,
              gift_qty: Number(item.percent),
              is_gift: true,
              min_amount: Number(item.price),
              product_id: x._id,
              product_name: x.name,
            });
          });
        } else if (Number(ctx.thresholdType) === 2) {
          ctx.products.map((x) => {
            // console.log("product", x);
            cond.push({
              package_id: package_id,
              threshold_qty: 0,
              min_csku_qty: Number(item.price),
              sku: x.sku,
              gift_qty: Number(item.percent),
              is_gift: true,
              min_amount: 0,
              product_id: x._id,
              product_name: x.name,
            });
          });
        }
      });
      const rawData = JSON.stringify({
        discount_data: {
          title: props.discountTitle,
          discounttype: 3,
          type: "threshold",
          value: 0,
          threshold_amount: Number(ctx.thresholdList[0].price),
          description: props.comments,
        },

        locations: props.zoneMapIDS,
        channel_id: props.channelOptionDefault,
        products: productIDS,
        start_date: props.startDateValue,
        end_date: props.endDateValue,
        // supplierID: supplierIDS,
        supplierID: supplierIDS[0],
        conditions: cond,
      });
      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: rawData,
      };
      console.log("aa request threshold", requestOptions);
      let url = `https://api2.ebazaar.mn/api/discount/add`;
      // fetch(url, requestOptions)
      //   .then((r) => r.json)
      //   .then((res) => {
      //     console.log("response add ", res);
      //     alert("Амжилттай нэмэгдлээ.");
      //   })
      //   .catch((error) => {
      //     console.log("promo add error", error);
      //     alert("Хямдрал бүртгэхэд алдаа гарлаа.", error);
      //     return;
      //   });
    } else if (Number(props.insertTypeProduct) === 2000) {
      console.log("Neg uramshuulaliig olon baraand olgox");
      console.log("console.log 2000");
      ctx.products.map((x) => {
        let package_id = Math.floor(Math.random() * 1000);
        var raw = {
          discount_data: {
            title: props.discountTitle,
            discounttype: 3,
            type: "gifts",
            value: 0,
            threshold_amount: 0,
            description: props.comments,
          },

          start_date: props.startDateValue,
          end_date: props.endDateValue,
          products: [x._id],
          locations: props.zoneMapIDS,
          channel_id: props.channelOptionDefault,
          supplierID: x.supplier_id,
          is_active: 1,
          conditions: [
            {
              package_id: package_id,
              threshold_qty: Number(props.discountValue),
              min_csku_qty: 0,
              sku: x.sku,
              gift_qty: 0,
              is_gift: false,
              product_id: x._id,
              product_name: x.name,
            },
            {
              package_id: package_id + 4,
              threshold_qty: 0,
              min_csku_qty: 0,
              sku: x.sku,
              gift_qty: Number(props.discountGiftValue),
              is_gift: true,
              product_id: x._id,
              product_name: x.name,
            },
          ],
        };
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(raw),
        };

        console.log("requestOptions olon render", requestOptions);

        fetch(`https://api2.ebazaar.mn/api/discount/add`)
          .then((res) => res.json())
          .then((res) => {
            console.log("response olon baraa", res);
          })
          .catch((error) => {
            alert(
              "Алдаа гарлаа та мэдээлэлээ шалгаад дахин оролдоно уу.",
              error
            );
          });
        setTimeout(() => {
          alert("Амжилттай нэмэгдлээ");
        }, 3000);
      });
    }
    ctx.setNextPage(false);
    props.setStartDateValue(null);
    props.setEndDateValue(null);
    ctx.setPromoChannel([]);
    props.setDiscountTitle("");
    props.setComments("");
    ctx.setGiftProduct([]);
  };
  return (
    <div className={css.buttonsContainer}>
      <button className={css.cancel} onClick={CancelHandler}>
        Цуцлах
      </button>
      <button className={css.confirm} onClick={ApproveHandlerTwo}>
        Хадгалах
      </button>
    </div>
  );
};

export default ProductTypeSelectButtonTwo;
