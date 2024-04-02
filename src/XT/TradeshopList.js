import css from "./tradeshoplist.module.css";
import filterIcon from "../assets/Filter 4.svg";

export const TradeshopList = () => {
  return (
    <div className={css.tradeshopsWrapper}>
      <div className={css.tradeshopHeaderWrapper}>
        <div className={css.tradeshopHeaderFilter}>
          <h5>Ү.цэгийн нэр</h5>
          <div className={css.inputWrapper}>
            <input type="text" placeholder="Хайх" />
          </div>
        </div>

        <div className={css.tradeshopHeaderFilter}>
          <h5>Суваг</h5>
          <div className={css.inputWrapper}>
            <input type="text" placeholder="Хайх" />
            <div className={css.filterIcon}>
              <img src={filterIcon} alt="Filter" />
            </div>
          </div>
        </div>

        <div className={css.tradeshopHeaderFilter}>
          <h5>Ү.ажилгааны чиглэл</h5>
          <div className={css.inputWrapper}>
            <input type="text" placeholder="Хайх" />
            <div className={css.filterIcon}>
              <img src={filterIcon} alt="Filter" />
            </div>
          </div>
        </div>

        <div className={css.tradeshopHeaderFilter}>
          <h5>Байгууллагын нэр</h5>
          <div className={css.inputWrapper}>
            <input type="text" placeholder="Хайх" />
          </div>
        </div>

        <div className={css.tradeshopHeaderFilter}>
          <h5>Дүүрэг/Сум</h5>
          <div className={css.inputWrapper}>
            <input type="text" placeholder="Хайх" />
            <div className={css.filterIcon}>
              <img src={filterIcon} alt="Filter" />
            </div>
          </div>
        </div>

        <div className={css.tradeshopHeaderFilter}>
          <h5>Хороо</h5>
          <div className={css.inputWrapper}>
            <input type="text" placeholder="Хайх" />
            <div className={css.filterIcon}>
              <img src={filterIcon} alt="Filter" />
            </div>
          </div>
        </div>

        <div className={css.tradeshopHeaderFilter}>
          <h5>Хаягын дэлгэрэнгүй</h5>
        </div>
      </div>
    </div>
  );
};
