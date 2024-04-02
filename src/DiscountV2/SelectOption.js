import React from "react";
import css from "./selectoption.module.css";
const SelectOption = React.usememo(() => {
  return (
    <div className={css.discontainer}>
      <div>
        <select>
          <option value="X+1">X+1</option>
          <option value="totalPrice">Нийт үнийн дүн</option>
          <option value="sort">Төрөл холихгүй</option>
          <option value="unsort">Төрөл холиод</option>
        </select>
      </div>
      <div>
        <input placeholder="Хямдалын нөхцөл" />
      </div>
      <div>
        <input placeholder="Хямдралын хувийн дэлгэрэнгүй тайлбар ..." />
      </div>
      <div>
        <button>Хямдралыг сонгосон</button>
      </div>
    </div>
  );
});

export default SelectOption;
