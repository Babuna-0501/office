import { useState } from "react";
import { Button } from "../../components/common";
import css from "./header.module.css";

export const DashboardHeader = (props) => {
  const { setStartDate, setEndDate, setSearchDistrict } = props;
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  const handleDate = () => {
    setEndDate(end);
    setStartDate(start);
  };
  return (
    <div className={css.container}>
      <div className={css.profileContainer} style={{ fontSize: "16px", fontWeight: "700" }}>
        Dashboard
      </div>

      <div className={css.dateContainer}>
        <input type="date" onChange={(e) => setStart(e.target.value)} />
        <input type="date" onChange={(e) => setEnd(e.target.value)} />
        <Button onClick={handleDate} variant="primary" size="small" width={100}>
          Шүүх
        </Button>
      </div>

      {/* <div className={css.selectContainer}>
        <span>Худалдааны зөвлөх</span>
        <select>
          <option>All</option>
        </select>
      </div> */}

      {/* <div className={css.selectContainer}>
        <span>Брэнд</span>
        <select>
          <option>All</option>
        </select>
      </div> */}

      {/* <div className={css.selectContainer}>
        <span>Дэд ангилал</span>
        <select>
          <option>All</option>
        </select>
      </div> */}

      {/* <div className={css.selectContainer}>
        <span>Бүтээгдэхүүүний нэр</span>
        <select>
          <option>All</option>
        </select>
      </div> */}

      {/* <div className={css.selectContainer}>
        <span>Дүүрэг</span>
        <select onChange={(e) => setSearchDistrict(e.target.value)}>
          <option value={null}>All</option>
          <option value={2}>Багануур</option>
          <option value={3}>Багахангай</option>
          <option value={4}>Баянгол</option>
          <option value={5}>Баянзүрх</option>
          <option value={6}>Налайх</option>
          <option value={7}>Сонгинохайрхан</option>
          <option value={8}>Сүбаатар</option>
          <option value={9}>Хан-Уул</option>
          <option value={10}>Чингэлтэй</option>
        </select>
      </div> */}

      {/* <div className={css.selectContainer}>
        <span>Дэлгүүр</span>
        <select>
          <option>All</option>
        </select>
      </div> */}

      {/* <div className={css.selectContainer}>
        <span>Төлөв</span>
        <select>
          <option>All</option>
        </select>
      </div> */}
    </div>
  );
};
