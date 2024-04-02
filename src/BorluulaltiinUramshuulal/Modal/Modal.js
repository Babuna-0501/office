import React, { useContext, useEffect, useState } from "react";
import css from "./modal.module.css";
import closeicon from "../../assets/close.svg";
import SMSHook from "../../Hooks/SMSHook";
import checkbox from "../../assets/check box.svg";
import checked from "../../assets/Tick Square_green.svg";
import myHeaders from "../../components/MyHeader/myHeader";
import Userdetail from "../User/Userdetail";
import DropdownZone from "../Dropdown/DropdownZone";

const Modal = (props) => {
  const [users, setUsers] = useState([]);
  const [filtervalue, setFiltervalue] = useState("");
  const [allcheck, setAllcheck] = useState(false);
  const [zoneOpen, setZoneOpen] = useState(false);
  const [zonedata, setZonedata] = useState([]);
  const [zonevalue, setZonevalue] = useState(null);

  const smsctx = useContext(SMSHook);
  // console.log("modal userdat", props);
  useEffect(() => {
    let aa = [];
    props.userdata?.map((a, i) => {
      aa.push({
        ...a,
        chosed: false,
        roleName: smsctx.role.filter(
          (item, index) => item.BackofficeRoleID === a.role
        )[0],
      });
    });
    setUsers(aa);
  }, [props]);

  // let filteredUsers = users?.filter((user) => {
  //   return user.first_name.toLowerCase().includes(filtervalue.toLowerCase());
  // });

  const AllChosed = () => {
    let update = users.map((item, index) => {
      return {
        ...item,
        chosed: !allcheck,
      };
    });
    // console.log("update", update);
    setUsers([...update]);
    setAllcheck((prev) => !prev);
  };

  console.log("zonedata", zonedata);

  useEffect(() => {
    let name = [];
    zonedata.map((item) => {
      if (smsctx.zoneids.includes(item._id)) {
        name.push(item.name);
      }
    });
    setZonevalue(name);
  }, [smsctx.zoneids]);

  return (
    <div className={css.background}>
      <div className={css.modal}>
        <div className={css.modalwrapper}>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                color: "#1A1A1A",
                fontWeight: "700",
              }}
            >
              Төлөвлөгөө гүйцэтгэх ажилтангууд сонгох
            </span>
            <img
              src={closeicon}
              alt="close icon"
              onClick={() => {
                smsctx?.setModalOpen(false);
              }}
              style={{
                width: "25px",
                cursor: "pointer",
                height: "25px",
              }}
            />
          </div>
          <div className={css.searchcontainer}>
            <div
              className={css.inputwrapper}
              style={{
                position: "relative",
              }}
            >
              <input
                placeholder="Бүсчлэл"
                onClick={(e) => {
                  setZoneOpen((prev) => !prev);
                }}
                value={zonevalue}
              />
              {zoneOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "50px",
                    left: "0px",
                    minWidth: "350px",
                  }}
                >
                  <DropdownZone setZonedata={setZonedata} />
                </div>
              )}
            </div>
            <div className={css.inputwrapper}>
              <input
                value={filtervalue}
                onChange={(e) => {
                  setFiltervalue(e.target.value);
                }}
                placeholder="Хайх"
              />
            </div>
            {/* <div className={css.checkwrapper}>
              <img
                src={allcheck === true ? checked : checkbox}
                alt="checkbox icon"
                onClick={AllChosed}
              />
              <span>Бүх ажилтан</span>
            </div> */}
          </div>
          <div className={css.body}>
            {users &&
              users.map((item, index) => {
                return (
                  <Userdetail
                    data={item}
                    key={index}
                    users={users}
                    setUsers={setUsers}
                  />
                );
              })}
          </div>
        </div>
        <div className={css.btncontainer}>
          <button
            className={css.cancel}
            onClick={() => {
              smsctx?.setModalOpen(false);
            }}
          >
            Цуцлах
          </button>
          <button
            className={css.confirm}
            onClick={() => {
              smsctx.setData([]);
              smsctx.setModalOpen(false);
              smsctx.setUramshuulalOpen(true);
              let aa = users.filter((x) => x.chosed === true);
              // console.log("users == true", aa);
              smsctx.setFilteredXT(aa);
            }}
          >
            Үргэлжлүүлэх
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
