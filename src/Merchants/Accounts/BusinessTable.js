import React, { useState } from "react";
import css from "./account.module.css";
import { styles } from "./style";
import BusinessEdit from "./BusinessEdit";
import TradeShop from "./TradeShop";

const BusinessTable = (props) => {
  let business = props.business;
  const [toggleEdit, setToggleEdit] = useState(false);

  class Modal extends React.Component {
    onClose = (e) => {
      this.props.onClose && this.props.onClose(e);
    };
    render() {
      if (!this.props.show) {
        return null;
      }
      return (
        <div className={css.modal_overlay}>
          <div className={css.modal}>
            <button onClick={this.onClose} className={css.closeBtn}>
              Close
            </button>
            <div style={{ marginTop: "15px" }}>{this.props.children}</div>
          </div>
        </div>
      );
    }
  }

  const toggleEditModal = (e) => {
    setToggleEdit(!toggleEdit);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: props.mainIndex % 2 === 0 ? "white" : "rgb(255, 251, 230)",
        cursor: "pointer",
        height: "100%",
      }}
    >
      <div
        style={{
          ...styles.businesses,
          height: "100%",
          borderRight: "0.8px solid #cfd8dc",
          borderBottom: "0.8px solid #cfd8dc",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 5px",
        }}
      >
        <div
          style={{
            ...styles.deliverDateContainer,
            fontWeight: "800",
            textAlign: "center",
          }}
          onClick={(e) => toggleEditModal(e)}
        >
          {business.companyName}
        </div>

        <div className={css.general} onClick={(e) => toggleEditModal(e)}>
          {business.register}, {business.businessName},{business.createdDate?.substring(0, 10)}
          {/* {business.customerId} , */}
        </div>
        <Modal onClose={toggleEditModal} show={toggleEdit} className={css.modal}>
          <BusinessEdit
            data={business}
            getRequest={props.getRequest}
            setToggleEdit={setToggleEdit}
            toggleEdit={toggleEdit}
          />
        </Modal>
      </div>

      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {business.tradeshops?.map((shop, index) => {
          return (
            <TradeShop
              key={index}
              data={shop}
              datas={props.data}
              getRequest={props.getRequest}
              locations={props.locations}
              businessType={props.businessType}
              suppliers={props.suppliers}
              business={business}
              userData={props.userData}
              index={index}
              mainIndex={props.mainIndex}
              sfa={props.sfa}
            />
          );
        })}
      </div>
    </div>
  );
};
export default BusinessTable;
