import React, { useState, useContext } from "react";
import upload from "../../assets/Upload_white.svg";
import uploadGray from "../../assets/Upload.svg";
import refreshIcon from "../../assets/refresh.svg";
import css from "./orderreportbtn.module.css";
import OrderReportHook from "../../Hooks/OrderReportHook";
import XTcompany from "../../Order/XTcompany";
import { Button } from "../../Achiltiinzahialga/components/common";
import carIcon from "../../assets/shipment/car-icon-shipment.svg";
import { colaOrderUsers } from "../../Order/Index";
import FilterConfig from "../../Order/FilterButton/FilterConfig";
import YunaToExcel from "../../OrderV2/components/yuna/Yuna";
import YunaModal from "./YunaModal";

const dataIDS = ["|14057|", "|14045|", "|13954|"];

const OrderReportBtn = (props) => {
  const orderCTX = useContext(OrderReportHook);
  const [isYunaModalOpen, setIsYunaModalOpen] = useState(false); // State to control modal visibility

  const refreshFunction = () => {
    props.setPage(["orders"]);
  };

  const onChange = (dates, dateStrings) => {
    if (dates) {
      console.log("From: ", dates[0], ", to: ", dates[1]);
    } else {
      console.log("Clear");
    }
  };

  const permission = Object.values(JSON.parse(props.userData.permission))[0];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          gap: 8,
        }}
      >
        <FilterConfig />
        <>
          {(props.userData.company_id === "|14005|" ||  
            props.userData.company_id === "|14005||14238|" ||
            props.userData.company_id === "|14191|" ||
            props.userData.company_id === "|14246|") && (
            <>
              <Button
                onClick={() => orderCTX.setShowOrderReceipts(true)}
                variant="primary"
                size="medium"
              >
                Хэвлэх
              </Button>
              <Button
                onClick={() => orderCTX.setShowOrderNegtgel(true)}
                variant="primary"
                size="medium"
              >
                Нэгтгэл
              </Button>
            </>
          )}

          <>
            <Button
              disabled={orderCTX?.tugeegchBtnDisabled}
              variant="primary"
              size="medium"
              onClick={() => {
                orderCTX.setShowTugeegchAssign(true);
              }}
            >
              Түгээгчид хувиарлах11
            </Button>

            <Button
              disabled={orderCTX?.shipmentBtnDisabled}
              variant="primary"
              size="medium"
              width={143}
              icon
              onClick={() => {
                orderCTX.setShowShipmentAssign(true);
              }}
            >
              <img src={carIcon} alt="Car" />
              Ачилт
            </Button>
          </>

          {props.userData.company_id === "|14057|" &&
            permission.order.report && (
              <Button
                variant="primary"
                size="medium"
                onClick={() => orderCTX.setReportThird(true)}
                icon
              >
                <img src={upload} alt="upload" />
                Тайлан
              </Button>
            )}
          {props.userData.company_id === "|14045|" &&
            permission.order.report && (
              <Button
                variant="primary"
                size="medium"
                onClick={() => orderCTX.setShowYunaReport(true)}
                icon
              >
                <img src={upload} alt="upload" />
                Хангамж
              </Button>
            )}
          {props.userData.company_id === "|14045|" &&
            permission.order.report && (
              <Button
                variant="primary"
                size="medium"
                onClick={() => {
                  orderCTX.setShowArigReport(true);
                  orderCTX.setYunaTailanType(2);
                }}
                icon
              >
                <img src={upload} alt="upload" />
                Д.Хөдөлгөөн
              </Button>
            )}

          {props.userData.company_id === "|14045|" &&
            permission.order.report && (
              <>
                <Button
                  variant="primary"
                  size="medium"
                  onClick={() => setIsYunaModalOpen(true)} 
                >
                  <img src={upload} alt="upload" />
                  Yuna Тайлан
                </Button>
                <YunaModal
                  isOpen={isYunaModalOpen}
                  onClose={() => setIsYunaModalOpen(false)} 
                >
                  <YunaToExcel />
                </YunaModal>
              </>
            )}

            
          {props.userData.company_id === "|14178|" &&
            permission.order.report && (
              <>
                <Button
                  variant="primary"
                  size="medium"
                  onClick={() => setIsYunaModalOpen(true)} 
                >
                  <img src={upload} alt="upload" />
                  MGC Тайлан
                </Button>
                <YunaModal
                  isOpen={isYunaModalOpen}
                  onClose={() => setIsYunaModalOpen(false)} 
                >
                  <YunaToExcel />
                </YunaModal>
              </>
            )}

          {props.userData.company_id === "|13954|" &&
            permission.order.report && (
              <Button
                variant="primary" 
                size="medium"
                onClick={() => orderCTX.setShowArigReport(true)}
                icon
              >
                <img src={upload} alt="upload" />
                Ариг тайлан
              </Button>
            )}

          {colaOrderUsers.includes(props.userData.id) && (
            <Button
              variant="primary"
              size="medium"
              onClick={() => orderCTX.setShowColaOrders(true)}
            >
              Cola захиалга
            </Button>
          )}
          {props.userData.id === 683 || props.userData.id === 685 || props.userData.id === 688 ? (
            <Button
              size="medium"
              variant="primary"
              onClick={() =>
                orderCTX.setBuramhanReport(!orderCTX.buramhanReport)
              }
              icon
            >
              <img src={upload} alt="upload" />
              Бурамхан тайлан
            </Button>
          ) : null}

          {!dataIDS.includes(props.userData.company_id) && (
            <Button
              variant="primary"
              size="medium"
              onClick={() => orderCTX.setReportSecond(true)}
              icon
            >
              <img src={upload} alt="upload" />
              Тайлан
            </Button>
          )}

          <Button
            variant="secondary"
            size="medium"
            onClick={() => orderCTX.setReport(true)}
            icon
          >
            <img src={uploadGray} alt="upload" />
            Дэлгэрэнгүй тайлан1
          </Button>
          {props.userData.id === 378 || props.userData.id === 1082 ? (
            <Button
              variant="secondary"
              size="medium"
              onClick={() => orderCTX.setReportDiamond(true)}
              icon
            >
              <img src={uploadGray} alt="upload" />
              Diamond тайлан
            </Button>
          ) : null}
        </>
      </div>
    </div>
  );
};

export default OrderReportBtn;
