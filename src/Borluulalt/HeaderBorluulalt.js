import css from "./borluulalt.module.css";

export const HeaderBorluulalt = () => {
  return (
    <div className={css.headerContainer}>
      <div>
        <span style={{ fontWeight: "700" }}>№</span>
        <input className={css.searchInput} style={{ width: "250px" }} placeholder="" disabled />
      </div>

      {/* <div>
        <span style={{ fontWeight: "700" }}>Зураг</span>
        <input
          className={css.searchInput}
          style={{ width: "50px" }}
          placeholder="Хайх..."
          disabled
        />
      </div> */}

      <div>
        <span style={{ fontWeight: "700" }}>Order Id</span>
        <input
          className={css.searchInput}
          style={{ width: "100px" }}
          placeholder="Хайх..."
          disabled
        />
      </div>
      <div>
        <span style={{ fontWeight: "700" }}>Үнэ</span>
        <input
          className={css.searchInput}
          style={{ width: "50px" }}
          placeholder="Хайх..."
          disabled
        />
      </div>
      {/* <div>
        <span style={{ fontWeight: "700" }}>Брэнд</span>
        <input
          className={css.searchInput}
          style={{ width: "200px" }}
          placeholder="Хайх..."
          disabled
        />
      </div> */}
      {/* <div>
        <span style={{ fontWeight: "700" }}>Ангилал</span>
        <input
          className={css.searchInput}
          style={{ width: "100px" }}
          placeholder="Хайх..."
          disabled
        />
      </div> */}
    </div>
  );
};
