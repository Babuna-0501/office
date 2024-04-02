// import React, { useContext, useState } from "react";
// import { Checkbox, Col, Row } from "antd";
// import css from "./channelsettung.module.css";
// import closeBtn from "../assets/close.svg";
// import PromoHook from "../../../Hooks/PromoHook";
// import ProductReportHook from "../../../Hooks/ProductsReportHook";

// const ChannelSetting = () => {
//   // const ctx = useContext(PromoHook);
//   const ctxProduct = useContext(ProductReportHook);
//   const [valueState, setValueState] = useState([]);
//   const [optionPlan, setOptionPlan] = useState([1, 2, 3]);

//   const onChangeHandler = () => {
//     // ctx.setPromoChannel([]);
//     let chanID = [];
//     let arr = [];
//     ctxProduct.sitedata?.business_types.map((item) => {
//       valueState.map((x) => {
//         if (item.business_type_id === x) {
//           arr.push(item);
//           chanID.push(item.business_type_id);
//         }
//       });
//     });

//     // ctx.setWillUpdateProd({
//     //   ...ctx.willUpdateProd,
//     //   channel_id: chanID,
//     // });
//     // ctx.setPromoChannel(arr);
//     // ctx.setChannel(false);
//   };
//   const onChange = (checkedValues) => {
//     setValueState(checkedValues);
//   };

//   return (
//     <div className={css.container}>
//       <div className={css.wrapperOne}></div>
//       <div className={css.wrapperTwo}>
//         <div className={css.contentFirstContainer}>
//           <div className={css.firstWrapper}>
//             <span>Сувгийн тохиргоо</span>
//             <img src={closeBtn} onClick={() => ctx.setChannel(false)} />
//           </div>
//           <div className={css.contentContainer}>
//             <div className={css.busTypeContainer}>
//               <Checkbox.Group
//                 style={{
//                   width: "100%",
//                 }}
//                 onChange={onChange}
//               >
//                 {ctxProduct.sitedata?.business_types.map((it, i) => {
//                   return (
//                     <Row key={i}>
//                       <Col span={12}>
//                         <Checkbox
//                           value={it.business_type_id}
//                           options={optionPlan}
//                         >
//                           {it.business_type_name}
//                         </Checkbox>
//                       </Col>
//                     </Row>
//                   );
//                 })}
//               </Checkbox.Group>
//             </div>
//           </div>
//         </div>
//         <div className={css.btnContainer} onClick={onChangeHandler}>
//           <span>Хадгалах</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChannelSetting;
