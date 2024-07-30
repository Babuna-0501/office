import React, { useState, useContext } from 'react';

import PromoHook from '../../Hooks/PromoHook';
import css from './producttypeselectbutton.module.css';
import myHeaders from '../HeaderContent/HeaderContent';
import PromoProductCheck from '../PromoProductCheck/PromoProductCheck';

const ProductTypeSelectButton = props => {
  const ctx = useContext(PromoHook);

  const ApproveHandler = () => {
    let channel = [];
    let productIDS;
    let sku;
    let supplierIDS;
    // console.log(" ctx.promoChannel", ctx.promoChannel);
    ctx.promoChannel.forEach(data => {
      channel.push(data.business_type_id);
    });
    // console.log(" ctx.collectionProduct", ctx.collectionProduct);
    ctx.collectionProduct.map(item => {
      productIDS = item.product_id;
      sku = item.sku;
      supplierIDS = item.supplier;
    });
    if (props.discountTitle.length === 0) {
      alert('Та урамшууллын гарчигаа оруулна уу.');
      return;
    }
    if (props.comments.length === 0) {
      alert('Та урамшууллын дэлгэрэнгүй бичиглэлээ оруулна уу.');
      return;
    }
    if (props.channelOptionDefault.length === 0) {
      alert('Та урамшууллын сувгаа оруулна уу.');
      return;
    }
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
    if (props.discountGiftValue === null) {
      alert('Та бэлгийн утгаа оруулна уу!!!');
      return;
    }
    if (props.discountValue === null) {
      alert('Та хямдралын утгаа оруулна уу!!!');
      return;
    }
    // console.log(
    //   "Number(ctx.insertTypeProduct)",
    //   Number(props.insertTypeProduct)
    // );

    if (Number(props.insertTypeProduct) === 500) {
      // console.log("console.log 500 ++++");
      // console.log("ctx.giftProduct", ctx.giftProduct);
      if (ctx.giftProduct.length === 0) {
        alert('Та хямдралын бэлэгээ оруулаагүй байна.');
        return;
      }
      // console.log("props.supplierChoseID", props.supplierChoseID);

      let cond = [];
      let products = [];
      let url = `${process.env.REACT_APP_API_URL2}/api/products/get1?ids=[${productIDS}]`;
      fetch(url, {
        method: 'GET',
        headers: myHeaders
      })
        .then(r => r.json())
        .then(res => {
          res.data.map(item => {
            products.push(item);
          });
        })
        .then(res => {
          let package_id = Math.floor(Math.random() * 1000);
          products.map(item => {
            cond.push({
              package_id: package_id + 1,
              threshold_qty: Number(props.discountValue),
              min_csku_qty: 0,
              sku: item.sku,
              gift_qty: 0,
              is_gift: false,
              product_id: item._id,
              product_name: item.name
            });
          });
          ctx.giftProduct.map(x => {
            // console.log("aaaaaaaaaaaa", x);
            let id = x.package_id;
            x.dete.map(item => {
              cond.push({
                package_id: id,
                threshold_qty: 0,
                min_csku_qty: 0,
                sku: x.sku,
                gift_qty: Number(props.discountGiftValue),
                is_gift: true,
                product_id: item.product_id,
                product_name: item.product_name
              });
            });
          });
          const rawData = {
            discount_data: {
              title: props.discountTitle,
              discounttype: 3,
              type: 'gifts',
              value: 0,
              threshold_amount: Number(props.discountValue),
              description: props.comments
            },
            conditions: cond,
            locations: props.zoneMapIDS,
            channel_id: props.channelOptionDefault,
            products: productIDS,
            start_date: props.startDateValue,
            end_date: props.endDateValue,
            // supplierID: supplierIDS,

            supplierID: ctx.supplierID
          };

          let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(rawData)
          };
          console.log('aa request 500 x+x+x', requestOptions);
          let url = `${process.env.REACT_APP_API_URL2}/api/discount/add`;
          fetch(url, requestOptions)
            .then(r => r.json)
            .then(res => {
              console.log('response add ', res);
            })
            .catch(error => {
              console.log('promo add error', error);
            });

          /////// BARAA OOR HYMDRALD HAMRAGDSAN BAIGAA ESEHIIG SHALGADAG EHLEB
          // fetch(
          //   `${process.env.REACT_APP_API_URL2}/api/discounts?product_ids=[${rawData.products}]`,
          //   {
          //     method: "GET",
          //     headers: myHeaders,
          //   }
          // )
          //   .then((r) => r.json())
          //   .then((response) => {
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
          //       console.log("aa request 500 x+x+x", requestOptions);
          //       let url = `${process.env.REACT_APP_API_URL2}/api/discount/add`;
          //       fetch(url, requestOptions)
          //         .then((r) => r.json)
          //         .then((res) => {
          //           console.log("response add ", res);
          //         })
          //         .catch((error) => {
          //           console.log("promo add error", error);
          //         });
          //     }
          //   });
          /////// BARAA OOR HYMDRALD HAMRAGDSAN BAIGAA ESEHIIG SHALGADAG TOGSOB
        })
        .catch(error => {
          alert('Алдаа гарлаа++++.', error);
        });
      // alert("Амжилттай нэмлээ");
      ctx.setNextPage(false);
      props.setStartDateValue(null);
      props.setEndDateValue(null);
      ctx.promoChannel([]);
      props.setDiscountTitle('');
      props.setComments('');
      ctx.setGiftProduct([]);
      ctx.setSupplierID(null);
    } else if (Number(props.insertTypeProduct) === 1000) {
      console.log('console.log 1000');
      console.log('bosgotoi uramshuulal');
      console.log('ctx.thresholdList', ctx.thresholdList);

      let cond = [];
      let products = [];
      let url = `${process.env.REACT_APP_API_URL2}/api/products/get1?ids=[${productIDS}]`;
      fetch(url, {
        method: 'GET',
        headers: myHeaders
      })
        .then(r => r.json())
        .then(res => {
          res.data.map(item => {
            products.push(item);
          });
        })
        .then(res => {
          console.log('ddddddddddddddddd');
          let package_id = Math.floor(Math.random() * 1000);
          ctx.thresholdList.map(item => {
            if (Number(ctx.thresholdType) === 1) {
              products.map(x => {
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
                  product_name: x.name
                });
              });
            } else if (Number(ctx.thresholdType) === 2) {
              products.map(x => {
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
                  product_name: x.name
                });
              });
            }
          });
        })
        .then(res => {
          const rawData = {
            discount_data: {
              title: props.discountTitle,
              discounttype: 3,
              type: 'threshold',
              value: 0,
              threshold_amount: Number(ctx.thresholdList[0].price),
              description: props.comments
            },

            locations: props.zoneMapIDS,
            channel_id: props.channelOptionDefault,
            products: productIDS,
            start_date: props.startDateValue,
            end_date: props.endDateValue,
            // supplierID: supplierIDS,
            supplierID: supplierIDS[0],
            conditions: cond
          };
          let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(rawData)
          };
          console.log('aabbcc request', requestOptions);
          let url = `${process.env.REACT_APP_API_URL2}/api/discount/add`;
          // fetch(url, requestOptions)
          //   .then((r) => r.json)
          //   .then((res) => {
          //     console.log("response add ", res);
          //   })
          //   .catch((error) => {
          //     console.log("promo add error", error);
          //     alert("Хямдрал бүртгэхэд алдаа гарлаа.", error);
          //     return;
          //   });
        })
        .catch(error => {
          alert('Алдаа гарлаа', error);
          return;
        });
      alert('Амжилттай нэмлээ');
      ctx.setNextPage(false);
      props.setStartDateValue(null);
      props.setEndDateValue(null);
      ctx.promoChannel([]);
      props.setDiscountTitle('');
      props.setComments('');
      ctx.setGiftProduct([]);
    } else if (Number(props.insertTypeProduct) === 2000) {
      console.log('Neg uramshuulaliig olon baraand olgox');
      console.log('console.log 2000');
      //   console.log("productIDS", productIDS);
      let url = `${process.env.REACT_APP_API_URL2}/api/products/get1?ids=[${productIDS}]`;
      console.log('url ', url);
      fetch(url, {
        method: 'GET',
        headers: myHeaders
      })
        .then(r => r.json())
        .then(res => {
          // console.log("response", res.data);
          if (res.data.length !== 0) {
            res.data.map(item => {
              let package_id = Math.floor(Math.random() * 1000);
              const rawData = {
                discount_data: {
                  title: props.discountTitle,
                  discounttype: 3,
                  type: 'gifts',
                  value: 0,
                  threshold_amount: 0,
                  description: props.comments
                },
                conditions: [
                  {
                    package_id: package_id,
                    threshold_qty: Number(props.discountValue),
                    min_csku_qty: 0,
                    sku: item.sku,
                    gift_qty: 0,
                    is_gift: false,
                    product_id: item._id,
                    product_name: item.name
                  },
                  {
                    package_id: package_id + 4,
                    threshold_qty: 0,
                    min_csku_qty: 0,
                    sku: item.sku,
                    gift_qty: Number(props.discountGiftValue),
                    is_gift: true,
                    product_id: item._id,
                    product_name: item.name
                  }
                ],
                locations: props.zoneMapIDS,
                channel_id: props.channelOptionDefault,
                products: [item._id],
                start_date: props.startDateValue,
                end_date: props.endDateValue,
                supplierID: item.supplier_id
              };
              let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(rawData)
              };
              console.log('aa request', requestOptions);
              fetch(
                `${process.env.REACT_APP_API_URL2}/api/discount/add`,
                requestOptions
              )
                .then(r => r.json)
                .then(res => {
                  console.log('response add ', res);
                })
                .catch(error => {
                  console.log('promo add error', error);
                  alert('Хямдрал бүртгэхэд алдаа гарлаа.', error);
                  return;
                });
              // setTimeout(() => {
              //   alert("Амжилттай нэмэгдлээ");
              // }, 4000);
            });
          }
        })
        .catch(error => {
          console.log('error product fetch', error);
        });
      alert('Амжилттай нэмлээ');
      ctx.setNextPage(false);
      props.setStartDateValue(null);
      props.setEndDateValue(null);
      ctx.setPromoChannel([]);
      props.setDiscountTitle('');
      props.setComments('');
      ctx.setGiftProduct([]);
      ctx.setSupplierID(null);
    }
  };
  const CancelHandler = () => {
    console.log('cancel handler');
    ctx.setNextPage(false);
    props.setStartDateValue(null);
    props.setEndDateValue(null);
    ctx.setPromoChannel([]);
    props.setDiscountTitle('');
    props.setComments('');
    ctx.setGiftProduct([]);
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

export default ProductTypeSelectButton;
