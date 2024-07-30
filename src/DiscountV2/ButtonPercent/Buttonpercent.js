import React, { useContext, useState } from 'react';
import PromoHook from '../../Hooks/PromoHook';
import css from './buttonpercent.module.css';
import myHeaders from '../HeaderContent/HeaderContent';
import PromoProductCheck from '../PromoProductCheck/PromoProductCheck';

const Buttonpercent = props => {
  const ctx = useContext(PromoHook);
  const CancelHandler = () => {
    ctx.setNextPage(false);
    props.setStartDateValue(null);
    props.setEndDateValue(null);
    ctx.setPromoChannel([]);
    props.setDiscountTitle('');
    props.setComments('');
    ctx.setGiftProduct([]);
  };
  const ApproveHandler = () => {
    let channel = [];
    let productIDS;
    let sku;
    let supplierIDS;

    ctx.promoChannel.forEach(data => {
      channel.push(data.business_type_id);
    });

    if (props.discountTitle.length === 0) {
      alert('Та урамшууллын гарчигаа оруулна уу.');
      return;
    }
    if (props.comments.length === 0) {
      alert('Та урамшууллын дэлгэрэнгүй бичиглэлээ оруулна уу.');
      return;
    }
    // if (props.channelOptionDefault.length === 0) {
    //   alert("Та урамшууллын сувгаа оруулна уу.");
    //   return;
    // }
    if (props.zoneMapIDS.length === 0) {
      alert('Хямдралын бүсчлэлийн мэдээлэл байхгүй байна.');
      return;
    }
    if (props.startDateValue === null) {
      alert('Та хямдралын эхлэх огноо оруулна уу!!!');
      return;
    }
    if (props.endDateValue === null) {
      alert('Та хямдралын дуусах огноо оруулна уу!!!');
      return;
    }
    let mainData;
    if (Number(ctx.productTypeSelect) === 1500) {
      //   console.log("props.discountytpe", props.discountType);
      //   console.log("collection chooose");
      let prodIDS = [];
      let supIDS = ctx.collectionProduct[0].supplier;
      // console.log("ctx.collectionProduct", ctx.collectionProduct);
      ctx.collectionProduct.map(item => {
        prodIDS = item.product_id;
        sku = item.sku;
        // supIDS = item.supplier;
      });

      mainData = {
        discount_data: {
          title: props.discountTitle,
          discounttype: props.discountType.type === 'percent' ? 1 : 1,
          type: props.discountType.type === 'percent' ? 'percent' : 'amount',
          value: Number(props.discountGiftValue),
          description: props.comments,
          threshold_amount:
            props.discountType.type === 'amount'
              ? Number(props.discountValue)
              : 0
        },
        conditions: [],
        start_date: props.startDateValue,
        end_date: props.endDateValue,
        products: prodIDS,

        locations: props.zoneMapIDS,
        // channel_id: channel,
        channel_id: props.channelOptionDefault,
        // supplierID: 13873,
        supplierID: Number(props.supplierChoseID),
        is_active: 1,
        skus: []
      };
    } else if (Number(ctx.productTypeSelect) === 1600) {
      let ids = [];
      ctx.products.map(item => {
        ids.push(item._id);
      });

      mainData = {
        discount_data: {
          title: props.discountTitle,
          discounttype: props.discountType.type === 'percent' ? 1 : 1,
          type: props.discountType.type === 'percent' ? 'percent' : 'amount',
          value: Number(props.discountGiftValue),
          description: props.comments,
          threshold_amount:
            props.discountType.type === 'amount'
              ? Number(props.discountValue)
              : 0
        },
        conditions: [],
        start_date: props.startDateValue,
        end_date: props.endDateValue,
        products: ids,

        locations: props.zoneMapIDS,
        // channel_id: channel,
        channel_id: props.channelOptionDefault,
        // supplierID: 13873,
        supplierID: props.supplierChoseID,
        is_active: 1,
        skus: []
      };
    }

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(mainData)
    };

    let urlnew = `${process.env.REACT_APP_API_URL2}/api/discount/add`;
    fetch(urlnew, requestOptions)
      .then(r => r.json)
      .then(res => {
        // console.log("response add ", res);
        alert('Амжилттай хямдрал нэмэгдлээ.');
        ctx.setNextPage(false);
        props.setStartDateValue(null);
        props.setEndDateValue(null);
        ctx.setPromoChannel([]);
        props.setDiscountTitle('');
        props.setComments('');
        ctx.setGiftProduct([]);
      })
      .catch(error => {
        console.log('promo add error', error);
        alert('Хямдрал бүртгэхэд алдаа гарлаа.');
      });

    ////// HYMDRALTAI BARAANIII OMNO N OOR HYMDRALD HAMRAGDSANIIG SHALGADAG CODE

    // fetch(
    //   `${process.env.REACT_APP_API_URL2}/api/discounts?product_ids=[${mainData.products}]`,
    //   {
    //     method: "GET",
    //     headers: myHeaders,
    //   }
    // )
    //   .then((r) => r.json())
    //   .then((response) => {
    //     console.log("response", response);
    //     let aa = false;
    //     let ids = [];
    //     response.map((item) => {
    //       if (
    //         Number(item.discount_data.discounttype) === 1 &&
    //         item.discount_data.type === mainData.discount_data.type
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
    //       console.log("percent  and amount requestOptions", requestOptions);
    //       let urlnew = `${process.env.REACT_APP_API_URL2}/api/discount/add`;
    //       fetch(urlnew, requestOptions)
    //         .then((r) => r.json)
    //         .then((res) => {
    //           console.log("response add ", res);
    //           alert("Амжилттай хямдрал нэмэгдлээ.");
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
    //           alert("Хямдрал бүртгэхэд алдаа гарлаа.");
    //         });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("promo duplicate check error", error);
    //   });
    ////// HYMDRALTAI BARAANIII OMNO N OOR HYMDRALD HAMRAGDSANIIG SHALGADAG CODE-NII TOGSGOL
  };
  return (
    <div className={css.buttonsContainer}>
      <button className={css.cancel} onClick={CancelHandler}>
        Цуцлах
      </button>
      <button className={css.confirm} onClick={ApproveHandler}>
        Хадгалах
      </button>
    </div>
  );
};

export default Buttonpercent;
