import React, { useContext, useEffect, useRef } from "react";
import css from "./sendbtn.module.css";
import myHeaders from "../../components/MyHeader/myHeader";
import { Company } from "../NoatCompany";
import AppHook from "../../Hooks/AppHook";
import { Button, Input } from "../../components/common";

const Sendbtn = (props) => {
  let registter = "";
  const noatctx = useContext(AppHook);

  const idref = useRef(null);

  registter = Company[props.userData.company_id];
	console.log("registter", registter);
	const Sendhandler = () => {
		let requestOptions = {
			method: "POST",
			headers: myHeaders,
			redirect: "follow",
			body: JSON.stringify({
				register: Number(registter),
			}),
		};
		console.log("requestOptions", requestOptions);
		fetch(`https://api2.ebazaar.mn/api/ebarimt/senddata`, requestOptions)
			.then(res => res.json())
			.then(res => {
				console.log("Res", res);
				if (res.code === 200) {
					alert("Татвар луу амжилттай илгээлээ");
				}
			})
			.catch(error => {
				console.log("error", error);
			});
	};

  const SearchHandler = (e) => {
    // console.log("15211", idref.current.value);

    noatctx.setOrderID(idref.current.value);
  };

  const HandleKeydown = (event) => {
    if (event.key === "Enter") {
      noatctx.setOrderID(idref.current.value);
    }
  };

  return (
    <div className={css.btncontainer}>
      <div className={css.inputwrapper}>
        <div className={css.inputitem}>
          <span
            style={{
              fontSize: "14px",
            }}
          >
            Захиалгын дугаар :
          </span>
          <input
            ref={idref}
            type="text"
            onClick={(e) => SearchHandler(e)}
            style={{
              width: "100px",
            }}
            onKeyDown={HandleKeydown}
          />
        </div>
        <input
          type="date"
          value={noatctx.startdate}
          onChange={(e) => {
            noatctx.setStartdate(e.target.value);
            window.localStorage.setItem("startdate", e.target.value);
          }}
        />
        <input
          type="date"
          value={noatctx.enddate}
          onChange={(e) => {
            noatctx.setEnddate(e.target.value);
            window.localStorage.setItem("enddate", e.target.value);
          }}
        />
      </div>
      <Button variant="primary" size="medium" onClick={Sendhandler}>
        Татвар илгээх
      </Button>
    </div>
  );
};

export default Sendbtn;
