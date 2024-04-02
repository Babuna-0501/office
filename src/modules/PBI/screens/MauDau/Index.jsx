import css from "./styles.module.css";

export const MauDau = () => {
  return (
    <div className={css.container}>
      <div className={css.chartsContainer}>
        <div className={css.barChartsContainer}>
          <MauDauBarChart />
        </div>

        <div className={css.lineChartsContainer}></div>
      </div>

      <MauDauRow />
    </div>
  );
};

const MauDauBarChart = () => {
  return (
    <div className={css.barChartContainer}>
      <h3 className={css.barChartTitle}>Харилцагч</h3>
      <div className={css.barChartContent}>
        <ul className={css.yAxis}>
          <li>
            <span>200</span>
          </li>
          <li>
            <span>100</span>
          </li>
          <li>
            <span>0</span>
          </li>
        </ul>

        <ul className={css.xAxis}>
          <li>January</li>
          <li>February</li>
          <li>March</li>
          <li>April</li>
          <li>May</li>
          <li>June</li>
          <li>July</li>
          <li>August</li>
        </ul>
      </div>
    </div>
  );
};

const MauDauRow = () => {
  return (
    <div className={css.rows}>
      <div className={css.singleRowItem}>
        <span className={css.rowItemTitle}>Сарын дундаж мерчант</span>
        <span className={css.rowItemStat}>236</span>
        <span className={css.rowItemGoal}>{"Goal: 3000"}</span>
      </div>

      <div className={css.singleRowItem}>
        <span className={css.rowItemTitle}>Сарын дундаж мерчант</span>
        <span className={css.rowItemStat}>236</span>
        <span className={css.rowItemGoal}>{"Goal: 3000"}</span>
      </div>

      <div className={css.singleRowItem}>
        <span className={css.rowItemTitle}>Сарын дундаж мерчант</span>
        <span className={css.rowItemStat}>236</span>
        <span className={css.rowItemGoal}>{"Goal: 3000"}</span>
      </div>

      <div className={css.singleRowItem}>
        <span className={css.rowItemTitle}>Сарын дундаж мерчант</span>
        <span className={css.rowItemStat}>236</span>
        <span className={css.rowItemGoal}>{"Goal: 3000"}</span>
      </div>

      <div className={css.singleRowItem}>
        <span className={css.rowItemTitle}>Сарын дундаж мерчант</span>
        <span className={css.rowItemStat}>236</span>
        <span className={css.rowItemGoal}>{"Goal: 3000"}</span>
      </div>

      <div className={css.singleRowItem}>
        <span className={css.rowItemTitle}>Сарын дундаж мерчант</span>
        <span className={css.rowItemStat}>236</span>
        <span className={css.rowItemGoal}>{"Goal: 3000"}</span>
      </div>

      <div className={css.singleRowItem}>
        <span className={css.rowItemTitle}>Сарын дундаж мерчант</span>
        <span className={css.rowItemStat}>236</span>
        <span className={css.rowItemGoal}>{"Goal: 3000"}</span>
      </div>
    </div>
  );
};
