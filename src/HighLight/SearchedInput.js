import React, { useState } from "react";
import css from "./searchedinput.module.css";

const SearchedInput = (props) => {
  const [searchValue, setSearchValue] = useState(null);
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    props.setSearch(e.target.value);
  };
  return (
    <div className={css.wrapper}>
      <span>{props.title}</span>
      <input
        placeholder="Бүтээгдэхүүн хайх ..."
        value={searchValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchedInput;
