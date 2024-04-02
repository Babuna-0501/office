import React, { useContext } from "react";
import css from "./header.module.css";
import AppHook from "../../Hooks/AppHook";

const Header = () => {
  const appctx = useContext(AppHook);
  return (
    <div className={css.document}>
      <div className={css.documentwrapper}>
        <label>Тэмдэглэл</label>
        <input
          placeholder="Та тэмдэглэл хийнэ үү"
          type="text"
          onChange={(e) => {
            appctx.setNote(e.target.value);
          }}
          value={appctx.note}
        />
      </div>
      <div className={css.documentwrapper}>
        <label>Падааны дугаар</label>
        <input
          placeholder="Та падааны нэмэлт мэдээлэл оруулна уу"
          type="text"
          value={appctx.padaanNote}
          onChange={(e) => {
            appctx.setPadaanNote(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Header;
